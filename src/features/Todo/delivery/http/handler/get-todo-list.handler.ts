import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetTodoListUseCaseInterface } from '../../../application/usecase/todo.usecases';
import type { TodoMapper } from '../mapper/todo.mapper';

export class GetTodoListHandler {
  constructor(
    private readonly useCase: GetTodoListUseCaseInterface,
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
