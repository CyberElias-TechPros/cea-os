const enc = new TextEncoder();

const toArrayBuffer = (data: string | Uint8Array | ArrayBuffer): ArrayBuffer => {
  if (typeof data === 'string') return enc.encode(data).buffer as ArrayBuffer;
  if (data instanceof ArrayBuffer) return data;
  const copy = new Uint8Array(data.byteLength);
  copy.set(data);
  return copy.buffer as ArrayBuffer;
};

const sha256Hex = async (data: string | Uint8Array | ArrayBuffer): Promise<string> => {
  const digest = await crypto.subtle.digest('SHA-256', toArrayBuffer(data));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
};

const hmac = async (key: Uint8Array, data: string | Uint8Array): Promise<Uint8Array> => {
  const k = await crypto.subtle.importKey('raw', toArrayBuffer(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', k, toArrayBuffer(data)));
};

const toHex = (u8: Uint8Array): string => [...u8].map((b) => b.toString(16).padStart(2, '0')).join('');

interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
}

export class R2Client {
  private config: R2Config;

  constructor(env: Record<string, string | undefined>) {
    this.config = {
      accountId: env.R2_ACCOUNT_ID ?? '',
      accessKeyId: env.R2_ACCESS_KEY_ID ?? '',
      secretAccessKey: env.R2_SECRET_ACCESS_KEY ?? '',
      bucket: env.R2_BUCKET || 'cea-uploads',
    };
  }

  get enabled(): boolean {
    return Boolean(this.config.accountId && this.config.accessKeyId && this.config.secretAccessKey);
  }

  private endpoint(key: string): string {
    return `https://${this.config.accountId}.r2.cloudflarestorage.com/${this.config.bucket}/${key}`;
  }

  private async signedHeaders(method: string, key: string, payloadHash: string): Promise<Record<string, string>> {
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.slice(0, 8);
    const host = new URL(this.endpoint(key)).host;
    const region = 'auto';

    const headers: Record<string, string> = {
      host,
      'x-amz-content-sha256': payloadHash,
      'x-amz-date': amzDate,
    };
    const signedKeys = Object.keys(headers).sort();

    const canonicalUri = `/${this.config.bucket}/${key}`;
    const canonicalHeaders = signedKeys.map((h) => `${h}:${headers[h]}\n`).join('');
    const canonicalRequest = [method, canonicalUri, '', canonicalHeaders, signedKeys.join(';'), payloadHash].join('\n');

    const scope = `${dateStamp}/${region}/s3/aws4_request`;
    const stringToSign = ['AWS4-HMAC-SHA256', amzDate, scope, await sha256Hex(canonicalRequest)].join('\n');

    const kDate = await hmac(enc.encode(`AWS4${this.config.secretAccessKey}`), dateStamp);
    const kRegion = await hmac(kDate, region);
    const kService = await hmac(kRegion, 's3');
    const kSigning = await hmac(kService, 'aws4_request');
    const signature = toHex(await hmac(kSigning, stringToSign));

    return {
      Authorization: `AWS4-HMAC-SHA256 Credential=${this.config.accessKeyId}/${scope}, SignedHeaders=${signedKeys.join(';')}, Signature=${signature}`,
      'x-amz-content-sha256': payloadHash,
      'x-amz-date': amzDate,
    };
  }

  async putObject(key: string, body: ArrayBuffer | Uint8Array, contentType: string, metadata?: Record<string, string>): Promise<Response> {
    const payloadHash = await sha256Hex(body);
    const headers = await this.signedHeaders('PUT', key, payloadHash);
    headers['content-type'] = contentType;
    if (metadata) {
      for (const [k, v] of Object.entries(metadata)) {
        headers[`x-amz-meta-${k}`] = v;
      }
    }
    return fetch(this.endpoint(key), { method: 'PUT', headers, body: toArrayBuffer(body) });
  }

  async getObject(key: string): Promise<Response> {
    const payloadHash = await sha256Hex('');
    const headers = await this.signedHeaders('GET', key, payloadHash);
    return fetch(this.endpoint(key), { method: 'GET', headers });
  }

  async deleteObject(key: string): Promise<Response> {
    const payloadHash = await sha256Hex('');
    const headers = await this.signedHeaders('DELETE', key, payloadHash);
    return fetch(this.endpoint(key), { method: 'DELETE', headers });
  }
}
