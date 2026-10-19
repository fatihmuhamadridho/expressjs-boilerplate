import express, { type RequestHandler } from 'express';
import type { DummyJsonResource } from '../../../../../common/dummyjson/delivery/dummyjson-proxy.runtime';
import type { UserHandler } from './handler/user.handler';

export function createUserRoutes(handler: UserHandler): RequestHandler {
  const router = express.Router();
  router.get('/', handler.getAll);
  router.get('/search', handler.search);
  router.get('/filter', handler.filter);
  router.get('/me', handler.getCurrentUser);
  router.post('/add', handler.add);
  router.post('/login', handler.login);
  router.get('/:userId/carts', handler.getCarts);
  router.get('/:userId/posts', handler.getPosts);
  router.get('/:userId/todos', handler.getTodos);
  router.get('/:id', handler.getById);
  router.put('/:id', handler.replace);
  router.patch('/:id', handler.update);
  router.delete('/:id', handler.delete);
  return router;
}

export function createUserResource(
  handler: UserHandler,
  mountPaths: readonly string[] = ['/users', '/user']
): DummyJsonResource {
  return {
    name: 'DummyJsonUser',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    mountPaths,
    routes: createUserRoutes(handler),
  };
}
