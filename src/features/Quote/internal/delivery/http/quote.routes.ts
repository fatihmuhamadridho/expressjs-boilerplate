import express, { type RequestHandler } from 'express';
import type { DummyJsonResource } from '../../../../../common/dummyjson/delivery/dummyjson-proxy.runtime';
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
): DummyJsonResource {
  return { name: 'Quote', methods: ['GET'], mountPaths, routes: createQuoteRoutes(handler) };
}
