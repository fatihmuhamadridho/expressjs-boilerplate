import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { VerifyTwoFactorCodeUseCaseInterface } from '../../../application/usecase/two-factor.usecases';
import type { TwoFactorMapper } from '../mapper/two-factor.mapper';

export class VerifyTwoFactorCodeHandler {
  constructor(
    private readonly useCase: VerifyTwoFactorCodeUseCaseInterface,
    private readonly mapper: TwoFactorMapper
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
