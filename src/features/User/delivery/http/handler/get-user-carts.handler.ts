import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetUserCartsUseCaseInterface } from '../../../application/usecase/user.usecases';
import type { UserMapper } from '../mapper/user.mapper';

export class GetUserCartsHandler {
  constructor(
    private readonly useCase: GetUserCartsUseCaseInterface,
    private readonly mapper: UserMapper
  ) {}

  Handle = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.useCase.Execute(
        String(request.params.userId),
        this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))
      );
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
