import type { TodoCommandDTO, TodoResultDTO } from '../dto/todo.dto';
import type { TodoRepository } from '../../domain/repository/todo.repository';

export interface CreateTodoUseCaseInterface {
  Execute(command: TodoCommandDTO): Promise<TodoResultDTO>;
}

export class CreateTodoUseCase implements CreateTodoUseCaseInterface {
  constructor(private readonly repository: TodoRepository) {}

  Execute(command: TodoCommandDTO): Promise<TodoResultDTO> {
    return this.repository.add(command);
  }
}
