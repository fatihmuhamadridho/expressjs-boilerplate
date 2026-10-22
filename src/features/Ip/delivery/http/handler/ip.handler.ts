import type { NextFunction, Request, Response } from 'express';
import type { ResourceResult } from '../../../../../pkg/httpclient/http-client';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
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
      const result: ResourceResult = await this.useCase.Execute(query);
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
