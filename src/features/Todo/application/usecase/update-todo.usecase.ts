import type { TodoCommandDTO, TodoResultDTO } from '../dto/todo.dto';
import type { TodoRepository } from '../../domain/repository/todo.repository';

export interface UpdateTodoUseCaseInterface {
  Execute(id: string, command: TodoCommandDTO): Promise<TodoResultDTO>;
}

export class UpdateTodoUseCase implements UpdateTodoUseCaseInterface {
  constructor(private readonly repository: TodoRepository) {}

  Execute(id: string, command: TodoCommandDTO): Promise<TodoResultDTO> {
    return this.repository.update(id, command);
  }
}
