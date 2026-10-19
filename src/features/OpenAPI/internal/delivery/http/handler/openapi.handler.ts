import type { NextFunction, Request, Response } from 'express';
import { DummyJsonGatewayError } from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import { GetOpenAPISpecUseCase } from '../../../application/usecase/get-openapi-spec.usecase';
import { OpenAPIMapper } from '../mapper/openapi.mapper';

export class OpenAPIHandler {
  constructor(
    private readonly useCase: GetOpenAPISpecUseCase,
    private readonly mapper: OpenAPIMapper
  ) {}
  getSpec = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const query = this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request));
      writeDummyJsonResponse(response, await this.useCase.Execute(query));
    } catch (error) {
      if (error instanceof DummyJsonGatewayError) {
        response.status(error.kind === 'timeout' ? 504 : 502).json({ message: error.message });
        return;
      }
      next(error);
    }
  };
}
