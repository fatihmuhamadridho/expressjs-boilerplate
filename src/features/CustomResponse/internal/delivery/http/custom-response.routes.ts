import express, { type RequestHandler } from 'express';
import type { DummyJsonResource } from '../../../../../common/dummyjson/delivery/dummyjson-proxy.runtime';
import type { CustomResponseHandler } from './handler/custom-response.handler';

export function createCustomResponseRoutes(handler: CustomResponseHandler): RequestHandler {
  const router = express.Router();
  router.post('/generate', handler.generate);
  router.get('/:identifier', handler.getByIdentifier);
  return router;
}

export function createCustomResponseResource(
  handler: CustomResponseHandler,
  mountPaths: readonly string[] = ['/c']
): DummyJsonResource {
  return { name: 'CustomResponse', methods: ['GET', 'POST'], mountPaths, routes: createCustomResponseRoutes(handler) };
}
