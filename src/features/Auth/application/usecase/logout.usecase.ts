import type { AuthCommandDTO, AuthResultDTO } from '../dto/auth.dto';
import type { AuthRepository } from '../../domain/repository/auth.repository';

export interface LogoutUseCaseInterface {
  Execute(command: AuthCommandDTO): Promise<AuthResultDTO>;
}

export class LogoutUseCase implements LogoutUseCaseInterface {
  constructor(private readonly repository: AuthRepository) {}

  Execute(command: AuthCommandDTO): Promise<AuthResultDTO> {
    return this.repository.logout(command);
  }
}
