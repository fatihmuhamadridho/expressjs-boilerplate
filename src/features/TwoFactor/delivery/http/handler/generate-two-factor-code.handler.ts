import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GenerateTwoFactorCodeUseCaseInterface } from '../../../application/usecase/two-factor.usecases';
import type { TwoFactorMapper } from '../mapper/two-factor.mapper';

export class GenerateTwoFactorCodeHandler {
  constructor(
    private readonly useCase: GenerateTwoFactorCodeUseCaseInterface,
    private readonly mapper: TwoFactorMapper
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
