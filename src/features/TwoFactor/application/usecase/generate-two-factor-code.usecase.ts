import type { TwoFactorQueryDTO, TwoFactorResultDTO } from '../dto/two-factor.dto';
import type { TwoFactorRepository } from '../../domain/repository/two-factor.repository';

export interface GenerateTwoFactorCodeUseCaseInterface {
  Execute(query: TwoFactorQueryDTO): Promise<TwoFactorResultDTO>;
}

export class GenerateTwoFactorCodeUseCase implements GenerateTwoFactorCodeUseCaseInterface {
  constructor(private readonly repository: TwoFactorRepository) {}

  Execute(query: TwoFactorQueryDTO): Promise<TwoFactorResultDTO> {
    return this.repository.generateCode(query);
  }
}
