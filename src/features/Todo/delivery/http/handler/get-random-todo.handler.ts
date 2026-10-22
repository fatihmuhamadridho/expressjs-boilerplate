import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetRandomTodoUseCaseInterface } from '../../../application/usecase/todo.usecases';
import type { TodoMapper } from '../mapper/todo.mapper';

export class GetRandomTodoHandler {
  constructor(
    private readonly useCase: GetRandomTodoUseCaseInterface,
    private readonly mapper: TodoMapper
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
