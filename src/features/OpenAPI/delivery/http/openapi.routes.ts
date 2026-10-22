import express, { type RequestHandler } from 'express';
import type { Resource } from '../../../../delivery/http/routes';
import type { OpenAPIHandler } from './handler/open-api.handler';

export function createOpenAPIRoutes(handler: OpenAPIHandler): RequestHandler {
  const router = express.Router();
  router.get('/', handler.getSpec);
  return router;
}

export function createOpenAPIResource(
  handler: OpenAPIHandler,
  mountPaths: readonly string[] = ['/openapi.json']
): Resource {
  return { name: 'OpenAPI', methods: ['GET'], mountPaths, routes: createOpenAPIRoutes(handler) };
}
