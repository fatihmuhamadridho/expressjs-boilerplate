import type { TodoQueryDTO, TodoResultDTO } from '../dto/todo.dto';
import type { TodoRepository } from '../../domain/repository/todo.repository';

export interface GetRandomBatchTodoUseCaseInterface {
  Execute(length: string, query: TodoQueryDTO): Promise<TodoResultDTO>;
}

export class GetRandomBatchTodoUseCase implements GetRandomBatchTodoUseCaseInterface {
  constructor(private readonly repository: TodoRepository) {}

  Execute(length: string, query: TodoQueryDTO): Promise<TodoResultDTO> {
    return this.repository.getRandomBatch(length, query);
  }
}
