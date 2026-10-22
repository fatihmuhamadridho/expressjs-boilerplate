import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { PostTestUseCaseInterface } from '../../../application/usecase/test.usecases';
import type { TestMapper } from '../mapper/test.mapper';

export class PostTestHandler {
  constructor(
    private readonly useCase: PostTestUseCaseInterface,
    private readonly mapper: TestMapper
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
