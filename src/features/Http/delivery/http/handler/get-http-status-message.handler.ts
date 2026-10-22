import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetHttpStatusMessageUseCaseInterface } from '../../../application/usecase/http.usecases';
import type { HttpMapper } from '../mapper/http.mapper';

export class GetHttpStatusMessageHandler {
  constructor(
    private readonly useCase: GetHttpStatusMessageUseCaseInterface,
    private readonly mapper: HttpMapper
  ) {}

  Handle = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.useCase.Execute(
        String(request.params.httpCode),
        String(request.params.message),
        this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))
      );
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
