import type { AuthCommandDTO, AuthResultDTO } from '../dto/auth.dto';
import type { AuthRepository } from '../../domain/repository/auth.repository';

export interface LoginUseCaseInterface {
  Execute(command: AuthCommandDTO): Promise<AuthResultDTO>;
}

export class LoginUseCase implements LoginUseCaseInterface {
  constructor(private readonly repository: AuthRepository) {}

  Execute(command: AuthCommandDTO): Promise<AuthResultDTO> {
    return this.repository.login(command);
  }
}
