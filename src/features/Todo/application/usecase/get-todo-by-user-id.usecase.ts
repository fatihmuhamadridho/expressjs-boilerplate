import type { TodoQueryDTO, TodoResultDTO } from '../dto/todo.dto';
import type { TodoRepository } from '../../domain/repository/todo.repository';

export interface GetTodoByUserIdUseCaseInterface {
  Execute(userId: string, query: TodoQueryDTO): Promise<TodoResultDTO>;
}

export class GetTodoByUserIdUseCase implements GetTodoByUserIdUseCaseInterface {
  constructor(private readonly repository: TodoRepository) {}

  Execute(userId: string, query: TodoQueryDTO): Promise<TodoResultDTO> {
    return this.repository.getByUserId(userId, query);
  }
}
