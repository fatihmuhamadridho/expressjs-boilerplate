import type { UserCommandDTO, UserResultDTO } from '../dto/user.dto';
import type { UserRepository } from '../../domain/repository/user.repository';

export interface UpdateUserUseCaseInterface {
  Execute(id: string, command: UserCommandDTO): Promise<UserResultDTO>;
}

export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(private readonly repository: UserRepository) {}

  Execute(id: string, command: UserCommandDTO): Promise<UserResultDTO> {
    return this.repository.update(id, command);
  }
}
