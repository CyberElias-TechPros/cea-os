import { Hono } from 'hono';
import { verify } from 'jsonwebtoken';
import type { Env } from '..';
import { authMiddleware } from '../middleware/auth';
import { R2Client } from '../lib/r2';

export const uploadsRouter = new Hono<Env>();

const MAX_SIZE = 25 * 1024 * 1024;
const KEY_RE = /^[a-zA-Z0-9][a-zA-Z0-9._/_-]{0,199}$/;

const validKey = (key: string): boolean =>
  Boolean(key && KEY_RE.test(key) && !key.includes('..') && !key.startsWith('/'));

// Native R2 binding when available, else cross-account S3 client via secrets
const r2 = (c: { env: Env['Bindings'] }) => {
  if (c.env.UPLOADS) return null;
  return new R2Client(c.env as unknown as Record<string, string>);
};

const upload = async (c: { env: Env['Bindings'] }, key: string, body: ArrayBuffer | Uint8Array, contentType: string) => {
  const binding = r2(c);
  if (binding === null) {
    await c.env.UPLOADS.put(key, body, { httpMetadata: { contentType }, customMetadata: { uploadedBy: 'api' } });
    return true;
  }
  if (!binding.enabled) return false;
  return (await binding.putObject(key, body, contentType)).ok;
};

const download = async (c: { env: Env['Bindings'] }, key: string): Promise<Response> => {
  const binding = r2(c);
  if (binding === null) {
    const obj = await c.env.UPLOADS.get(key);
    if (!obj) return new Response(null, { status: 404 });
    const headers = new Headers();
    headers.set('content-type', obj.httpMetadata?.contentType ?? 'application/octet-stream');
    headers.set('content-length', String(obj.size));
    headers.set('etag', obj.httpEtag);
    headers.set('cache-control', key.startsWith('public/') ? 'public, max-age=3600' : 'private, no-store');
    const body = await obj.arrayBuffer();
    return new Response(body, { status: 200, headers });
  }
  if (!binding.enabled) return new Response(null, { status: 503 });
  return binding.getObject(key);
};

const remove = async (c: { env: Env['Bindings'] }, key: string): Promise<boolean> => {
  const binding = r2(c);
  if (binding === null) {
    await c.env.UPLOADS.delete(key);
    return true;
  }
  if (!binding.enabled) return false;
  return (await binding.deleteObject(key)).ok;
};

// PUT /v1/uploads/:key — authenticated upload, body is the raw file
uploadsRouter.put('/:key{.*}', authMiddleware, async (c) => {
  const key = c.req.param('key');
  if (!validKey(key)) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid object key' } }, 422);
  }

  const client = r2(c);
  if (client !== null && !client.enabled) {
    return c.json({ success: false, error: { code: 'R2_NOT_CONFIGURED', message: 'Uploads are not configured yet' } }, 503);
  }

  const length = Number(c.req.header('content-length') ?? 0);
  if (length > MAX_SIZE) {
    return c.json({ success: false, error: { code: 'FILE_TOO_LARGE', message: 'File exceeds 25MB limit' } }, 413);
  }

  const contentType = c.req.header('content-type') ?? 'application/octet-stream';
  const body = await c.req.arrayBuffer();
  if (body.byteLength > MAX_SIZE) {
    return c.json({ success: false, error: { code: 'FILE_TOO_LARGE', message: 'File exceeds 25MB limit' } }, 413);
  }

  const ok = await upload(c, key, body, contentType);
  if (!ok) {
    return c.json({ success: false, error: { code: 'UPLOAD_FAILED', message: 'R2 upload failed' } }, 502);
  }

  return c.json({
    success: true,
    data: { key, url: `/v1/uploads/${key}`, contentType, size: body.byteLength },
  }, 201);
});

// GET /v1/uploads/:key — public only for keys under public/, otherwise authenticated
uploadsRouter.get('/:key{.*}', async (c) => {
  const key = c.req.param('key');
  if (!validKey(key)) {
    return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Object not found' } }, 404);
  }

  const isPublic = key.startsWith('public/');
  const authHeader = c.req.header('Authorization');
  if (!isPublic) {
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } }, 401);
    }
    try {
      verify(authHeader.slice(7), c.env.JWT_SECRET);
    } catch {
      return c.json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Token expired or invalid' } }, 401);
    }
  }

  const client = r2(c);
  if (client !== null && !client.enabled) {
    return c.json({ success: false, error: { code: 'R2_NOT_CONFIGURED', message: 'Uploads are not configured yet' } }, 503);
  }

  const res = await download(c, key);
  if (!res || !res.ok) {
    return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Object not found' } }, res?.status === 404 ? 404 : 502);
  }

  const headers = new Headers();
  const contentType = res.headers.get('content-type') ?? 'application/octet-stream';
  headers.set('content-type', contentType);
  headers.set('content-length', res.headers.get('content-length') ?? '');
  const etag = res.headers.get('etag');
  if (etag) headers.set('etag', etag);
  headers.set('cache-control', isPublic ? 'public, max-age=3600' : 'private, no-store');
  return new Response(res.body, { status: 200, headers });
});

// DELETE /v1/uploads/:key — authenticated
uploadsRouter.delete('/:key{.*}', authMiddleware, async (c) => {
  const key = c.req.param('key');
  if (!validKey(key)) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid object key' } }, 422);
  }
  const client = r2(c);
  if (client !== null && !client.enabled) {
    return c.json({ success: false, error: { code: 'R2_NOT_CONFIGURED', message: 'Uploads are not configured yet' } }, 503);
  }
  const ok = await remove(c, key);
  if (!ok) {
    return c.json({ success: false, error: { code: 'DELETE_FAILED', message: 'R2 delete failed' } }, 502);
  }
  return c.json({ success: true, data: { message: 'Object deleted' } });
});
