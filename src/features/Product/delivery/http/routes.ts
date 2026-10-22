import express, { type RequestHandler } from 'express';
import type { ProductHandler } from './handler/product.handler';

export function createProductRoutes(handler: ProductHandler): RequestHandler {
  const router = express.Router();
  router.get('/', handler.getAll);
  router.get('/search', handler.search);
  router.get('/category-list', handler.getCategoryList);
  router.get('/categories', handler.getCategories);
  router.get('/category/:category', handler.getByCategory);
  router.post('/add', handler.add);
  router.get('/:id', handler.getById);
  router.put('/:id', handler.replace);
  router.patch('/:id', handler.update);
  router.delete('/:id', handler.delete);
  return router;
}
