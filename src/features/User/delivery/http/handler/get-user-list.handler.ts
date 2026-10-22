import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetUserListUseCaseInterface } from '../../../application/usecase/user.usecases';
import type { UserMapper } from '../mapper/user.mapper';

export class GetUserListHandler {
  constructor(
    private readonly useCase: GetUserListUseCaseInterface,
    private readonly mapper: UserMapper
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
