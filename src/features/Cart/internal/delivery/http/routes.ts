import express, { type RequestHandler } from 'express';
import type { CartHandler } from './handler/cart.handler';
export function createCartRoutes(handler: CartHandler): RequestHandler {
  const router = express.Router();
  router.get('/', handler.getAll);
  router.get('/user/:userId', handler.getByUserId);
  router.post('/add', handler.add);
  router.get('/:id', handler.getById);
  router.put('/:id', handler.replace);
  router.patch('/:id', handler.update);
  router.delete('/:id', handler.delete);
  return router;
}
