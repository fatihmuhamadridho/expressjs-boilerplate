import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { LoginUserUseCaseInterface } from '../../../application/usecase/user.usecases';
import type { UserMapper } from '../mapper/user.mapper';

export class LoginUserHandler {
  constructor(
    private readonly useCase: LoginUserUseCaseInterface,
    private readonly mapper: UserMapper
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
