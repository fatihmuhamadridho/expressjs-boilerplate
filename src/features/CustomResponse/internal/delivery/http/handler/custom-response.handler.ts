import type { NextFunction, Request, Response } from 'express';
import {
  DummyJsonGatewayError,
  type DummyJsonResponse,
} from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import type { CustomResponseUseCases } from '../../../application/usecase/custom-response.usecases';
import { CustomResponseMapper } from '../mapper/custom-response.mapper';

export class CustomResponseHandler {
  constructor(
    private readonly useCases: CustomResponseUseCases,
    private readonly mapper: CustomResponseMapper
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
  generate = this.execute((r) => this.useCases.generate(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r))));
  getByIdentifier = this.execute((r) =>
    this.useCases.getByIdentifier(String(r.params.identifier), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
}
