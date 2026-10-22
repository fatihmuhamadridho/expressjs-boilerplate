import type { UserQueryDTO, UserResultDTO } from '../dto/user.dto';
import type { UserRepository } from '../../domain/repository/user.repository';

export interface GetUserProfileUseCaseInterface {
  Execute(query: UserQueryDTO): Promise<UserResultDTO>;
}

export class GetUserProfileUseCase implements GetUserProfileUseCaseInterface {
  constructor(private readonly repository: UserRepository) {}

  Execute(query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.getCurrentUser(query);
  }
}
