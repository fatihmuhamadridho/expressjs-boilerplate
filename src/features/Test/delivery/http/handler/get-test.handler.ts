import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetTestUseCaseInterface } from '../../../application/usecase/test.usecases';
import type { TestMapper } from '../mapper/test.mapper';

export class GetTestHandler {
  constructor(
    private readonly useCase: GetTestUseCaseInterface,
    private readonly mapper: TestMapper
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
