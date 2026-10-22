import type { UserQueryDTO, UserResultDTO } from '../dto/user.dto';
import type { UserRepository } from '../../domain/repository/user.repository';

export interface SearchUserUseCaseInterface {
  Execute(query: UserQueryDTO): Promise<UserResultDTO>;
}

export class SearchUserUseCase implements SearchUserUseCaseInterface {
  constructor(private readonly repository: UserRepository) {}

  Execute(query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.search(query);
  }
}
