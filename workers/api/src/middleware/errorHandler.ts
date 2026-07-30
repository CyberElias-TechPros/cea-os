import type { ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

export const errorHandler: ErrorHandler = (err, c) => {
  console.error(`[ERROR] ${err.message}`, err);

  if (err instanceof HTTPException) {
    return c.json({
      success: false,
      error: {
        code: err.res ? 'HTTP_ERROR' : 'VALIDATION_ERROR',
        message: err.message,
      },
    }, err.status as ContentfulStatusCode);
  }

  if (err instanceof SyntaxError) {
    return c.json({
      success: false,
      error: { code: 'PARSE_ERROR', message: 'Invalid JSON body' },
    }, 400);
  }

  if (err instanceof ZodError) {
    return c.json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: err.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      },
    }, 422);
  }

  return c.json({
    success: false,
    error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' },
  }, 500);
};
