import express, { type RequestHandler } from 'express';
import type { DummyJsonResource } from '../../../../../common/dummyjson/delivery/dummyjson-proxy.runtime';
import type { TodoHandler } from './handler/todo.handler';

export function createTodoRoutes(handler: TodoHandler): RequestHandler {
  const router = express.Router();
  router.get('/', handler.getAll);
  router.get('/random', handler.getRandom);
  router.get('/random/:length', handler.getRandomBatch);
  router.get('/user/:userId', handler.getByUserId);
  router.post('/add', handler.add);
  router.get('/:id', handler.getById);
  router.put('/:id', handler.replace);
  router.patch('/:id', handler.update);
  router.delete('/:id', handler.delete);
  return router;
}

export function createTodoResource(
  handler: TodoHandler,
  mountPaths: readonly string[] = ['/todos', '/todo']
): DummyJsonResource {
  return {
    name: 'Todo',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    mountPaths,
    routes: createTodoRoutes(handler),
  };
}
