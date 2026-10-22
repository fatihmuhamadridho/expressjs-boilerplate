import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetTodoByUserIdUseCaseInterface } from '../../../application/usecase/todo.usecases';
import type { TodoMapper } from '../mapper/todo.mapper';

export class GetTodoByUserIdHandler {
  constructor(
    private readonly useCase: GetTodoByUserIdUseCaseInterface,
    private readonly mapper: TodoMapper
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
