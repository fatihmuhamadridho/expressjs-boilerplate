import type { NextFunction, Request, Response } from 'express';
import {
  DummyJsonGatewayError,
  type DummyJsonResponse,
} from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import type { IconUseCases } from '../../../application/usecase/icon.usecases';
import { IconMapper } from '../mapper/icon.mapper';

export class IconHandler {
  constructor(
    private readonly useCases: IconUseCases,
    private readonly mapper: IconMapper
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
  getDefault = this.execute((r) => this.useCases.getDefault(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r))));
  getByHash = this.execute((r) =>
    this.useCases.getByHash(String(r.params.hash), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
  getByHashAndSize = this.execute((r) =>
    this.useCases.getByHashAndSize(
      String(r.params.hash),
      String(r.params.size),
      this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r))
    )
  );
}
