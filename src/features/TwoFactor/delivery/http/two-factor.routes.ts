import express, { type RequestHandler } from 'express';
import type { Resource } from '../../../../delivery/http/routes';
import type { TwoFactorHandler } from './handler/two-factor.handler';

export function createTwoFactorRoutes(handler: TwoFactorHandler): RequestHandler {
  const router = express.Router();
  router.get('/', handler.generateCode);
  router.post('/', handler.verifyCode);
  return router;
}

export function createTwoFactorResource(handler: TwoFactorHandler, mountPaths: readonly string[] = ['/2fa']): Resource {
  return { name: 'TwoFactor', methods: ['GET', 'POST'], mountPaths, routes: createTwoFactorRoutes(handler) };
}
