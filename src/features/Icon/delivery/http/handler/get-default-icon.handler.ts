import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetDefaultIconUseCaseInterface } from '../../../application/usecase/icon.usecases';
import type { IconMapper } from '../mapper/icon.mapper';

export class GetDefaultIconHandler {
  constructor(
    private readonly useCase: GetDefaultIconUseCaseInterface,
    private readonly mapper: IconMapper
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
