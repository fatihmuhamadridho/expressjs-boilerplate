import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { UpdateTodoUseCaseInterface } from '../../../application/usecase/todo.usecases';
import type { TodoMapper } from '../mapper/todo.mapper';

export class UpdateTodoHandler {
  constructor(
    private readonly useCase: UpdateTodoUseCaseInterface,
    private readonly mapper: TodoMapper
  ) {}

  Handle = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.useCase.Execute(
        String(request.params.id),
        this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request))
      );
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
