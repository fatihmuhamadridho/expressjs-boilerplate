import type { Response } from 'express';
import type { ResourceResult } from '../httpclient/http-client';

export function writeResponse(response: Response, result: ResourceResult): void {
  const isJson = /application\/json|\+json/i.test(String(result.headers['content-type'] ?? ''));
  for (const [name, value] of Object.entries(result.headers)) {
    if (isJson && ['content-type', 'content-length', 'content-encoding', 'etag'].includes(name.toLowerCase())) continue;
    response.setHeader(name, Array.isArray(value) ? [...value] : value);
  }
  if (result.statusCode === 204 || result.statusCode === 304) {
    response.status(result.statusCode).end();
    return;
  }
  if (!isJson && result.statusCode < 400) {
    response.status(result.statusCode).send(Buffer.from(result.body));
    return;
  }
  let data: unknown =
    isJson && result.body.byteLength > 0 ? JSON.parse(Buffer.from(result.body).toString('utf8')) : null;
  if (result.statusCode >= 400) {
    const serverError = result.statusCode >= 500;
    response.status(result.statusCode).json({
      status: serverError ? 'error' : 'fail',
      error: {
        code: serverError ? 'UPSTREAM_ERROR' : 'REQUEST_FAILED',
        message: serverError
          ? 'Unable to complete request'
          : isRecord(data) && typeof data.message === 'string'
            ? data.message
            : 'Request failed',
      },
      data: null,
    });
    return;
  }
  if (isRecord(data) && typeof data.openapi === 'string') {
    data = { ...data, servers: [{ url: '/api' }] };
  }
  let meta: { pagination: { currentPage: number; perPage: number; total: number; totalPages: number } } | undefined;
  if (
    isRecord(data) &&
    typeof data.total === 'number' &&
    typeof data.skip === 'number' &&
    typeof data.limit === 'number'
  ) {
    const { total, skip, limit, ...payload } = data;
    meta = {
      pagination: {
        currentPage: limit > 0 ? Math.floor(skip / limit) + 1 : 1,
        perPage: limit,
        total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : total > 0 ? 1 : 0,
      },
    };
    data = payload;
  }
  response.status(result.statusCode).json({ status: 'success', data, ...(meta ? { meta } : {}) });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
