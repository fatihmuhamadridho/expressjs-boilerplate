import express, { type RequestHandler } from 'express';
import type { DummyJsonResource } from '../../../../../common/dummyjson/delivery/dummyjson-proxy.runtime';
import type { OpenAPIHandler } from './handler/openapi.handler';

export function createOpenAPIRoutes(handler: OpenAPIHandler): RequestHandler {
  const router = express.Router();
  router.get('/', handler.getSpec);
  return router;
}

export function createOpenAPIResource(
  handler: OpenAPIHandler,
  mountPaths: readonly string[] = ['/openapi.json']
): DummyJsonResource {
  return { name: 'OpenAPI', methods: ['GET'], mountPaths, routes: createOpenAPIRoutes(handler) };
}
