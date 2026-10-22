import express, { type RequestHandler } from 'express';
import type { Resource } from '../../../../delivery/http/routes';
import type { QuoteHandler } from './handler/quote.handler';

export function createQuoteRoutes(handler: QuoteHandler): RequestHandler {
  const router = express.Router();
  router.get('/', handler.getAll);
  router.get('/random', handler.getRandom);
  router.get('/random/:length', handler.getRandomBatch);
  router.get('/:id', handler.getById);
  return router;
}

export function createQuoteResource(
  handler: QuoteHandler,
  mountPaths: readonly string[] = ['/quotes', '/quote']
): Resource {
  return { name: 'Quote', methods: ['GET'], mountPaths, routes: createQuoteRoutes(handler) };
}
