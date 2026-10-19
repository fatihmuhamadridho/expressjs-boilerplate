import type { TodoCommandDTO, TodoQueryDTO, TodoResultDTO } from '../dto/todo.dto';
import type { TodoRepository } from '../todo.interface';

export class TodoUseCases {
  constructor(private readonly repository: TodoRepository) {}
  getAll(query: TodoQueryDTO): Promise<TodoResultDTO> {
    return this.repository.getAll(query);
  }
  getById(id: string, query: TodoQueryDTO): Promise<TodoResultDTO> {
    return this.repository.getById(id, query);
  }
  getRandom(query: TodoQueryDTO): Promise<TodoResultDTO> {
    return this.repository.getRandom(query);
  }
  getRandomBatch(length: string, query: TodoQueryDTO): Promise<TodoResultDTO> {
    return this.repository.getRandomBatch(length, query);
  }
  getByUserId(userId: string, query: TodoQueryDTO): Promise<TodoResultDTO> {
    return this.repository.getByUserId(userId, query);
  }
  add(command: TodoCommandDTO): Promise<TodoResultDTO> {
    return this.repository.add(command);
  }
  replace(id: string, command: TodoCommandDTO): Promise<TodoResultDTO> {
    return this.repository.replace(id, command);
  }
  update(id: string, command: TodoCommandDTO): Promise<TodoResultDTO> {
    return this.repository.update(id, command);
  }
  delete(id: string, command: TodoCommandDTO): Promise<TodoResultDTO> {
    return this.repository.delete(id, command);
  }
}
