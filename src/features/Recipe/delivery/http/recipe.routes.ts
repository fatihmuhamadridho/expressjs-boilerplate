import express, { type RequestHandler } from 'express';
import type { Resource } from '../../../../delivery/http/routes';
import type { RecipeHandler } from './handler/recipe.handler';

export function createRecipeRoutes(handler: RecipeHandler): RequestHandler {
  const router = express.Router();
  router.get('/', handler.getAll);
  router.get('/search', handler.search);
  router.get('/tags', handler.getTags);
  router.get('/tag/:tag', handler.getByTag);
  router.get('/meal-type/:mealType', handler.getByMealType);
  router.post('/add', handler.add);
  router.get('/:id', handler.getById);
  router.put('/:id', handler.replace);
  router.patch('/:id', handler.update);
  router.delete('/:id', handler.delete);
  return router;
}

export function createRecipeResource(
  handler: RecipeHandler,
  mountPaths: readonly string[] = ['/recipes', '/recipe']
): Resource {
  return {
    name: 'Recipe',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    mountPaths,
    routes: createRecipeRoutes(handler),
  };
}
