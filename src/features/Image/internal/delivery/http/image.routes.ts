import express, { type RequestHandler } from 'express';
import type { DummyJsonResource } from '../../../../../common/dummyjson/delivery/dummyjson-proxy.runtime';
import type { ImageHandler } from './handler/image.handler';

export function createImageRoutes(handler: ImageHandler): RequestHandler {
  const router = express.Router();
  router.get('/:size/:background/:color/:type', handler.generate);
  router.get('/:size/:background/:color', handler.generate);
  router.get('/:size/:background', handler.generate);
  router.get('/:size', handler.generate);
  return router;
}

export function createImageResource(
  handler: ImageHandler,
  mountPaths: readonly string[] = ['/image']
): DummyJsonResource {
  return { name: 'Image', methods: ['GET'], mountPaths, routes: createImageRoutes(handler) };
}
