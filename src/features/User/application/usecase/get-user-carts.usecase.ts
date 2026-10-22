import type { UserQueryDTO, UserResultDTO } from '../dto/user.dto';
import type { UserRepository } from '../../domain/repository/user.repository';

export interface GetUserCartsUseCaseInterface {
  Execute(userId: string, query: UserQueryDTO): Promise<UserResultDTO>;
}

export class GetUserCartsUseCase implements GetUserCartsUseCaseInterface {
  constructor(private readonly repository: UserRepository) {}

  Execute(userId: string, query: UserQueryDTO): Promise<UserResultDTO> {
    return this.repository.getCarts(userId, query);
  }
}
