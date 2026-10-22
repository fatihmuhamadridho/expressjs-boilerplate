import express, { type RequestHandler } from 'express';
import type { Resource } from '../../../../delivery/http/routes';
import type { PostHandler } from './handler/post.handler';

export function createPostRoutes(handler: PostHandler): RequestHandler {
  const router = express.Router();
  router.get('/', handler.getAll);
  router.get('/search', handler.search);
  router.get('/tag-list', handler.getTagList);
  router.get('/tags', handler.getTags);
  router.get('/tag/:tag', handler.getByTag);
  router.get('/user/:userId', handler.getByUserId);
  router.get('/:postId/comments', handler.getComments);
  router.post('/add', handler.add);
  router.get('/:id', handler.getById);
  router.put('/:id', handler.replace);
  router.patch('/:id', handler.update);
  router.delete('/:id', handler.delete);
  return router;
}

export function createPostResource(
  handler: PostHandler,
  mountPaths: readonly string[] = ['/posts', '/post']
): Resource {
  return {
    name: 'Post',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    mountPaths,
    routes: createPostRoutes(handler),
  };
}
