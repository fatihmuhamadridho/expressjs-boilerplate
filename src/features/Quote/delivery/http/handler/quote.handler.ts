import type { RequestHandler } from 'express';
import { GetQuoteListHandler } from './get-quote-list.handler';
import { GetQuoteDetailHandler } from './get-quote-detail.handler';
import { GetRandomQuoteHandler } from './get-random-quote.handler';
import { GetRandomBatchQuoteHandler } from './get-random-batch-quote.handler';
import type {
  GetQuoteListUseCaseInterface,
  GetQuoteDetailUseCaseInterface,
  GetRandomQuoteUseCaseInterface,
  GetRandomBatchQuoteUseCaseInterface,
} from '../../../application/usecase/quote.usecases';
import type { QuoteMapper } from '../mapper/quote.mapper';

export interface QuoteUseCases {
  getAll: GetQuoteListUseCaseInterface;
  getById: GetQuoteDetailUseCaseInterface;
  getRandom: GetRandomQuoteUseCaseInterface;
  getRandomBatch: GetRandomBatchQuoteUseCaseInterface;
}

export class QuoteHandler {
  readonly getAll: RequestHandler;
  readonly getById: RequestHandler;
  readonly getRandom: RequestHandler;
  readonly getRandomBatch: RequestHandler;

  constructor(useCases: QuoteUseCases, mapper: QuoteMapper) {
    this.getAll = new GetQuoteListHandler(useCases.getAll, mapper).Handle;
    this.getById = new GetQuoteDetailHandler(useCases.getById, mapper).Handle;
    this.getRandom = new GetRandomQuoteHandler(useCases.getRandom, mapper).Handle;
    this.getRandomBatch = new GetRandomBatchQuoteHandler(useCases.getRandomBatch, mapper).Handle;
  }
}
