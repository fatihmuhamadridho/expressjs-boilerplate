import type { TodoQueryDTO, TodoResultDTO } from '../dto/todo.dto';
import type { TodoRepository } from '../../domain/repository/todo.repository';

export interface GetTodoDetailUseCaseInterface {
  Execute(id: string, query: TodoQueryDTO): Promise<TodoResultDTO>;
}

export class GetTodoDetailUseCase implements GetTodoDetailUseCaseInterface {
  constructor(private readonly repository: TodoRepository) {}

  Execute(id: string, query: TodoQueryDTO): Promise<TodoResultDTO> {
    return this.repository.getById(id, query);
  }
}
