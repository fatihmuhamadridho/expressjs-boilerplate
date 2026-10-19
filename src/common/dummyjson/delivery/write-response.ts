import type { Response } from 'express';
import type { DummyJsonResponse } from '../application/dummyjson.interface';

export function writeDummyJsonResponse(response: Response, result: DummyJsonResponse): void {
  for (const [name, value] of Object.entries(result.headers)) {
    response.setHeader(name, Array.isArray(value) ? [...value] : value);
  }
  response.status(result.statusCode).send(Buffer.from(result.body));
}
