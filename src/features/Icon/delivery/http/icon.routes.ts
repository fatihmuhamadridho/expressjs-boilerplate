import express, { type RequestHandler } from 'express';
import type { Resource } from '../../../../delivery/http/routes';
import type { IconHandler } from './handler/icon.handler';

export function createIconRoutes(handler: IconHandler): RequestHandler {
  const router = express.Router();
  router.get('/', handler.getDefault);
  router.get('/:hash/:size', handler.getByHashAndSize);
  router.get('/:hash', handler.getByHash);
  return router;
}

export function createIconResource(handler: IconHandler, mountPaths: readonly string[] = ['/icon']): Resource {
  return { name: 'Icon', methods: ['GET'], mountPaths, routes: createIconRoutes(handler) };
}
