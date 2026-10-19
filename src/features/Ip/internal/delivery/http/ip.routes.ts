import express, { type RequestHandler } from 'express';
import type { DummyJsonResource } from '../../../../../common/dummyjson/delivery/dummyjson-proxy.runtime';
import type { IpHandler } from './handler/ip.handler';

export function createIpRoutes(handler: IpHandler): RequestHandler {
  const router = express.Router();
  router.get('/', handler.lookup);
  return router;
}

export function createIpResource(handler: IpHandler, mountPaths: readonly string[] = ['/ip']): DummyJsonResource {
  return { name: 'Ip', methods: ['GET'], mountPaths, routes: createIpRoutes(handler) };
}
