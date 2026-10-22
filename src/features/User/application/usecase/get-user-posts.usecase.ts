import type { UserQueryDTO, UserResultDTO } from '../dto/user.dto';
import type { UserRepository } from '../../domain/repository/user.repository';

export interface GetUserPostsUseCaseInterface {
  Execute(userId: string, query: UserQueryDTO): Promise<UserResultDTO>;
}

export class GetUserPostsUseCase implements GetUserPostsUseCaseInterface {
  constructor(private readonly repository: UserRepository) {}

  Execute(userId: string, query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.getPosts(userId, query);
  }
}
