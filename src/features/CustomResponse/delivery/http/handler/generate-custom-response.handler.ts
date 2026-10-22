import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GenerateCustomResponseUseCaseInterface } from '../../../application/usecase/custom-response.usecases';
import type { CustomResponseMapper } from '../mapper/custom-response.mapper';

export class GenerateCustomResponseHandler {
  constructor(
    private readonly useCase: GenerateCustomResponseUseCaseInterface,
    private readonly mapper: CustomResponseMapper
  ) {}

  Handle = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.useCase.Execute(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request)));
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
