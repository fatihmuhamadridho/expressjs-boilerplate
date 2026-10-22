import type { TodoQueryDTO, TodoResultDTO } from '../dto/todo.dto';
import type { TodoRepository } from '../../domain/repository/todo.repository';

export interface GetTodoListUseCaseInterface {
  Execute(query: TodoQueryDTO): Promise<TodoResultDTO>;
}

export class GetTodoListUseCase implements GetTodoListUseCaseInterface {
  constructor(private readonly repository: TodoRepository) {}

  Execute(query: TodoQueryDTO): Promise<TodoResultDTO> {
    return this.repository.getAll(query);
  }
}
