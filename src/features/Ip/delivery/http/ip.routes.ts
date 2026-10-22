import express, { type RequestHandler } from 'express';
import type { Resource } from '../../../../delivery/http/routes';
import type { IpHandler } from './handler/ip.handler';

export function createIpRoutes(handler: IpHandler): RequestHandler {
  const router = express.Router();
  router.get('/', handler.lookup);
  return router;
}

export function createIpResource(handler: IpHandler, mountPaths: readonly string[] = ['/ip']): Resource {
  return { name: 'Ip', methods: ['GET'], mountPaths, routes: createIpRoutes(handler) };
}
