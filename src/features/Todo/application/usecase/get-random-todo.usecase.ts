import type { TodoQueryDTO, TodoResultDTO } from '../dto/todo.dto';
import type { TodoRepository } from '../../domain/repository/todo.repository';

export interface GetRandomTodoUseCaseInterface {
  Execute(query: TodoQueryDTO): Promise<TodoResultDTO>;
}

export class GetRandomTodoUseCase implements GetRandomTodoUseCaseInterface {
  constructor(private readonly repository: TodoRepository) {}

  Execute(query: TodoQueryDTO): Promise<TodoResultDTO> {
    return this.repository.getRandom(query);
  }
}
