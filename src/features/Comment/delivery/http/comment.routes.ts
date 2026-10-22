import express, { type RequestHandler } from 'express';
import type { Resource } from '../../../../delivery/http/routes';
import type { CommentHandler } from './handler/comment.handler';

export function createCommentRoutes(handler: CommentHandler): RequestHandler {
  const router = express.Router();
  router.get('/', handler.getAll);
  router.get('/post/:postId', handler.getByPostId);
  router.post('/add', handler.add);
  router.get('/:id', handler.getById);
  router.put('/:id', handler.replace);
  router.patch('/:id', handler.update);
  router.delete('/:id', handler.delete);
  return router;
}

export function createCommentResource(
  handler: CommentHandler,
  mountPaths: readonly string[] = ['/comments', '/comment']
): Resource {
  return {
    name: 'Comment',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    mountPaths,
    routes: createCommentRoutes(handler),
  };
}
