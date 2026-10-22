import type { UserCommandDTO, UserResultDTO } from '../dto/user.dto';
import type { UserRepository } from '../../domain/repository/user.repository';

export interface CreateUserUseCaseInterface {
  Execute(command: UserCommandDTO): Promise<UserResultDTO>;
}

export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(private readonly repository: UserRepository) {}

  Execute(command: UserCommandDTO): Promise<UserResultDTO> {
    return this.repository.add(command);
  }
}
