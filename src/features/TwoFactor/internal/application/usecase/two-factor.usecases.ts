import type { TwoFactorCommandDTO, TwoFactorQueryDTO, TwoFactorResultDTO } from '../dto/two-factor.dto';
import type { TwoFactorRepository } from '../two-factor.interface';

export class TwoFactorUseCases {
  constructor(private readonly repository: TwoFactorRepository) {}
  generateCode(query: TwoFactorQueryDTO): Promise<TwoFactorResultDTO> {
    return this.repository.generateCode(query);
  }
  verifyCode(command: TwoFactorCommandDTO): Promise<TwoFactorResultDTO> {
    return this.repository.verifyCode(command);
  }
}
