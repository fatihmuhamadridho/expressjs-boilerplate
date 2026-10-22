import type { UserCommandDTO, UserResultDTO } from '../dto/user.dto';
import type { UserRepository } from '../../domain/repository/user.repository';

export interface ReplaceUserUseCaseInterface {
  Execute(id: string, command: UserCommandDTO): Promise<UserResultDTO>;
}

export class ReplaceUserUseCase implements ReplaceUserUseCaseInterface {
  constructor(private readonly repository: UserRepository) {}

  Execute(id: string, command: UserCommandDTO): Promise<UserResultDTO> {
    return this.repository.replace(id, command);
  }
}
