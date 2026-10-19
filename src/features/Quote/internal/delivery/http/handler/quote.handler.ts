import type { NextFunction, Request, Response } from 'express';
import {
  DummyJsonGatewayError,
  type DummyJsonResponse,
} from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import type { QuoteUseCases } from '../../../application/usecase/quote.usecases';
import { QuoteMapper } from '../mapper/quote.mapper';

export class QuoteHandler {
  constructor(
    private readonly useCases: QuoteUseCases,
    private readonly mapper: QuoteMapper
  ) {}
  private execute =
    (work: (request: Request) => Promise<DummyJsonResponse>) =>
    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      try {
        writeDummyJsonResponse(response, await work(request));
      } catch (error) {
        if (error instanceof DummyJsonGatewayError) {
          response.status(error.kind === 'timeout' ? 504 : 502).json({ message: error.message });
          return;
        }
        next(error);
      }
    };
  getAll = this.execute((r) => this.useCases.getAll(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r))));
  getById = this.execute((r) =>
    this.useCases.getById(String(r.params.id), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
  getRandom = this.execute((r) => this.useCases.getRandom(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r))));
  getRandomBatch = this.execute((r) =>
    this.useCases.getRandomBatch(String(r.params.length), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
}
