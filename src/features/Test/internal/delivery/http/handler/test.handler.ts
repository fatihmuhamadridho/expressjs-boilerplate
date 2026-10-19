import type { NextFunction, Request, Response } from 'express';
import {
  DummyJsonGatewayError,
  type DummyJsonResponse,
} from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import type { TestUseCases } from '../../../application/usecase/test.usecases';
import { TestMapper } from '../mapper/test.mapper';

export class TestHandler {
  constructor(
    private readonly useCases: TestUseCases,
    private readonly mapper: TestMapper
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
  get = this.execute((r) => this.useCases.get(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r))));
  post = this.execute((r) => this.useCases.post(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r))));
  put = this.execute((r) => this.useCases.put(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r))));
  patch = this.execute((r) => this.useCases.patch(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r))));
  delete = this.execute((r) => this.useCases.delete(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r))));
}
