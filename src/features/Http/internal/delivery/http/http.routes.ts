import express, { type RequestHandler } from 'express';
import type { DummyJsonResource } from '../../../../../common/dummyjson/delivery/dummyjson-proxy.runtime';
import type { HttpHandler } from './handler/http.handler';

export function createHttpRoutes(handler: HttpHandler): RequestHandler {
  const router = express.Router();
  router.get('/:httpCode/:message', handler.getStatusMessage);
  router.get('/:httpCode', handler.getStatus);
  return router;
}

export function createHttpResource(handler: HttpHandler, mountPaths: readonly string[] = ['/http']): DummyJsonResource {
  return { name: 'Http', methods: ['GET'], mountPaths, routes: createHttpRoutes(handler) };
}
