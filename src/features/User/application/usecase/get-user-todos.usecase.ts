import type { UserQueryDTO, UserResultDTO } from '../dto/user.dto';
import type { UserRepository } from '../../domain/repository/user.repository';

export interface GetUserTodosUseCaseInterface {
  Execute(userId: string, query: UserQueryDTO): Promise<UserResultDTO>;
}

export class GetUserTodosUseCase implements GetUserTodosUseCaseInterface {
  constructor(private readonly repository: UserRepository) {}

  Execute(userId: string, query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.getTodos(userId, query);
  }
}
