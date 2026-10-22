import type { UserCommandDTO, UserResultDTO } from '../dto/user.dto';
import type { UserRepository } from '../../domain/repository/user.repository';

export interface LoginUserUseCaseInterface {
  Execute(command: UserCommandDTO): Promise<UserResultDTO>;
}

export class LoginUserUseCase implements LoginUserUseCaseInterface {
  constructor(private readonly repository: UserRepository) {}

  Execute(command: UserCommandDTO): Promise<UserResultDTO> {
    return this.repository.login(command);
  }
}
