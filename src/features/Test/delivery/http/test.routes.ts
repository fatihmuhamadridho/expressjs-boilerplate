import express, { type RequestHandler } from 'express';
import type { Resource } from '../../../../delivery/http/routes';
import type { TestHandler } from './handler/test.handler';

export function createTestRoutes(handler: TestHandler): RequestHandler {
  const router = express.Router();
  router.get('/', handler.get);
  router.post('/', handler.post);
  router.put('/', handler.put);
  router.patch('/', handler.patch);
  router.delete('/', handler.delete);
  return router;
}

export function createTestResource(handler: TestHandler, mountPaths: readonly string[] = ['/test']): Resource {
  return {
    name: 'Test',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    mountPaths,
    routes: createTestRoutes(handler),
  };
}
