import type { UserQueryDTO, UserResultDTO } from '../dto/user.dto';
import type { UserRepository } from '../../domain/repository/user.repository';

export interface FilterUserUseCaseInterface {
  Execute(query: UserQueryDTO): Promise<UserResultDTO>;
}

export class FilterUserUseCase implements FilterUserUseCaseInterface {
  constructor(private readonly repository: UserRepository) {}

  Execute(query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.filter(query);
  }
}
