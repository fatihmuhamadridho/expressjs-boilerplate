import express, { type RequestHandler } from 'express';
import type { AuthHandler } from './handler/auth.handler';

export function createAuthRoutes(handler: AuthHandler): RequestHandler {
  const router = express.Router();
  router.post('/login', handler.login);
  router.post('/logout', handler.logout);
  router.post('/refresh', handler.refresh);
  router.get('/me', handler.getCurrentUser);
  router.all('*path', (_request, _response, next) => next());
  return router;
}
