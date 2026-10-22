import type { UserQueryDTO, UserResultDTO } from '../dto/user.dto';
import type { UserRepository } from '../../domain/repository/user.repository';

export interface GetUserListUseCaseInterface {
  Execute(query: UserQueryDTO): Promise<UserResultDTO>;
}

export class GetUserListUseCase implements GetUserListUseCaseInterface {
  constructor(private readonly repository: UserRepository) {}

  Execute(query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.getAll(query);
  }
}
