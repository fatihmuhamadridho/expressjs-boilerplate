import type { NextFunction, Request, Response } from 'express';
import {
  DummyJsonGatewayError,
  type DummyJsonResponse,
} from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import type { HttpUseCases } from '../../../application/usecase/http.usecases';
import { HttpMapper } from '../mapper/http.mapper';

export class HttpHandler {
  constructor(
    private readonly useCases: HttpUseCases,
    private readonly mapper: HttpMapper
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
  getStatus = this.execute((r) =>
    this.useCases.getStatus(String(r.params.httpCode), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
  getStatusMessage = this.execute((r) =>
    this.useCases.getStatusMessage(
      String(r.params.httpCode),
      String(r.params.message),
      this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r))
    )
  );
}
