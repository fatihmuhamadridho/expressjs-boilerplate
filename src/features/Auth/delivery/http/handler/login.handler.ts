import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { LoginUseCaseInterface } from '../../../application/usecase/auth.usecases';
import type { AuthMapper } from '../mapper/auth.mapper';

export class LoginHandler {
  constructor(
    private readonly useCase: LoginUseCaseInterface,
    private readonly mapper: AuthMapper
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
