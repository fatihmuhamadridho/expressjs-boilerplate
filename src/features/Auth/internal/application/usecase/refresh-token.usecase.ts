import type { AuthCommandDTO, AuthResultDTO } from '../dto/auth.dto';
import type { AuthRepository } from '../auth.interface';

export interface RefreshTokenUseCaseInterface {
  Execute(command: AuthCommandDTO): Promise<AuthResultDTO>;
}

export class RefreshTokenUseCase implements RefreshTokenUseCaseInterface {
  constructor(private readonly repository: AuthRepository) {}

  Execute(command: AuthCommandDTO): Promise<AuthResultDTO> {
    return this.repository.refresh(command);
  }
}
