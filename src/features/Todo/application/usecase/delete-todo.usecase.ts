import type { TodoCommandDTO, TodoResultDTO } from '../dto/todo.dto';
import type { TodoRepository } from '../../domain/repository/todo.repository';

export interface DeleteTodoUseCaseInterface {
  Execute(id: string, command: TodoCommandDTO): Promise<TodoResultDTO>;
}

export class DeleteTodoUseCase implements DeleteTodoUseCaseInterface {
  constructor(private readonly repository: TodoRepository) {}

  Execute(id: string, command: TodoCommandDTO): Promise<TodoResultDTO> {
    return this.repository.delete(id, command);
  }
}
