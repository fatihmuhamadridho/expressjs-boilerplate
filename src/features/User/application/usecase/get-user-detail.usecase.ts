import type { UserQueryDTO, UserResultDTO } from '../dto/user.dto';
import type { UserRepository } from '../../domain/repository/user.repository';

export interface GetUserDetailUseCaseInterface {
  Execute(id: string, query: UserQueryDTO): Promise<UserResultDTO>;
}

export class GetUserDetailUseCase implements GetUserDetailUseCaseInterface {
  constructor(private readonly repository: UserRepository) {}

  Execute(id: string, query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.getById(id, query);
  }
}
