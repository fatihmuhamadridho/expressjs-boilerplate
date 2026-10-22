import type { NextFunction, Request, Response } from 'express';

import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import { GetOpenAPISpecUseCase } from '../../../application/usecase/get-open-api-spec.usecase';
import { OpenAPIMapper } from '../mapper/openapi.mapper';

export class OpenAPIHandler {
  constructor(
    private readonly useCase: GetOpenAPISpecUseCase,
    private readonly mapper: OpenAPIMapper
  ) {}
  getSpec = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const query = this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request));
      writeResponse(response, await this.useCase.Execute(query));
    } catch (error) {
      next(error);
    }
  };
}
