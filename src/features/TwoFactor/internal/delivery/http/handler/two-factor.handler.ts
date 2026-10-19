import type { NextFunction, Request, Response } from 'express';
import {
  DummyJsonGatewayError,
  type DummyJsonResponse,
} from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import type { TwoFactorUseCases } from '../../../application/usecase/two-factor.usecases';
import { TwoFactorMapper } from '../mapper/two-factor.mapper';

export class TwoFactorHandler {
  constructor(
    private readonly useCases: TwoFactorUseCases,
    private readonly mapper: TwoFactorMapper
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
  generateCode = this.execute((r) => this.useCases.generateCode(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r))));
  verifyCode = this.execute((r) => this.useCases.verifyCode(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r))));
}
