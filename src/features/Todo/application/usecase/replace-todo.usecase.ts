import type { TodoCommandDTO, TodoResultDTO } from '../dto/todo.dto';
import type { TodoRepository } from '../../domain/repository/todo.repository';

export interface ReplaceTodoUseCaseInterface {
  Execute(id: string, command: TodoCommandDTO): Promise<TodoResultDTO>;
}

export class ReplaceTodoUseCase implements ReplaceTodoUseCaseInterface {
  constructor(private readonly repository: TodoRepository) {}

  Execute(id: string, command: TodoCommandDTO): Promise<TodoResultDTO> {
    return this.repository.replace(id, command);
  }
}
