import type { NextFunction, Request, Response } from 'express';
import {
  DummyJsonGatewayError,
  type DummyJsonResponse,
} from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import { LookupIpUseCase } from '../../../application/usecase/lookup-ip.usecase';
import { IpMapper } from '../mapper/ip.mapper';

export class IpHandler {
  constructor(
    private readonly useCase: LookupIpUseCase,
    private readonly mapper: IpMapper
  ) {}
  lookup = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const query = this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request));
      const result: DummyJsonResponse = await this.useCase.Execute(query);
      writeDummyJsonResponse(response, result);
    } catch (error) {
      if (error instanceof DummyJsonGatewayError) {
        response.status(error.kind === 'timeout' ? 504 : 502).json({ message: error.message });
        return;
      }
      next(error);
    }
  };
}
