import type { UserCommandDTO, UserQueryDTO, UserResultDTO } from '../dto/user.dto';
import type { DummyJsonUserRepository } from '../user.interface';

export class UserUseCases {
  constructor(private readonly repository: DummyJsonUserRepository) {}
  getAll(query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.getAll(query);
  }
  search(query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.search(query);
  }
  filter(query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.filter(query);
  }
  getCurrentUser(query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.getCurrentUser(query);
  }
  getById(id: string, query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.getById(id, query);
  }
  getCarts(userId: string, query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.getCarts(userId, query);
  }
  getPosts(userId: string, query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.getPosts(userId, query);
  }
  getTodos(userId: string, query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.getTodos(userId, query);
  }
  add(command: UserCommandDTO): Promise<UserResultDTO> {
    return this.repository.add(command);
  }
  login(command: UserCommandDTO): Promise<UserResultDTO> {
    return this.repository.login(command);
  }
  replace(id: string, command: UserCommandDTO): Promise<UserResultDTO> {
    return this.repository.replace(id, command);
  }
  update(id: string, command: UserCommandDTO): Promise<UserResultDTO> {
    return this.repository.update(id, command);
  }
  delete(id: string, command: UserCommandDTO): Promise<UserResultDTO> {
    return this.repository.delete(id, command);
  }
}
