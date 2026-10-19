import type { AuthQueryDTO, AuthResultDTO } from '../dto/auth.dto';
import type { AuthRepository } from '../auth.interface';

export interface GetCurrentUserUseCaseInterface {
  Execute(query: AuthQueryDTO): Promise<AuthResultDTO>;
}

export class GetCurrentUserUseCase implements GetCurrentUserUseCaseInterface {
  constructor(private readonly repository: AuthRepository) {}

  Execute(query: AuthQueryDTO): Promise<AuthResultDTO> {
    return this.repository.getCurrentUser(query);
  }
}
