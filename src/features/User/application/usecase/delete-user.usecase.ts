import type { UserCommandDTO, UserResultDTO } from '../dto/user.dto';
import type { UserRepository } from '../../domain/repository/user.repository';

export interface DeleteUserUseCaseInterface {
  Execute(id: string, command: UserCommandDTO): Promise<UserResultDTO>;
}

export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  constructor(private readonly repository: UserRepository) {}

  Execute(id: string, command: UserCommandDTO): Promise<UserResultDTO> {
    return this.repository.delete(id, command);
  }
}
