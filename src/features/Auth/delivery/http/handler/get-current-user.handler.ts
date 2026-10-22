import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetCurrentUserUseCaseInterface } from '../../../application/usecase/auth.usecases';
import type { AuthMapper } from '../mapper/auth.mapper';

export class GetCurrentUserHandler {
  constructor(
    private readonly useCase: GetCurrentUserUseCaseInterface,
    private readonly mapper: AuthMapper
  ) {}

  Handle = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.useCase.Execute(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request)));
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
