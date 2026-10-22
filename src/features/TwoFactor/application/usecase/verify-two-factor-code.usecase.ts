import type { TwoFactorCommandDTO, TwoFactorResultDTO } from '../dto/two-factor.dto';
import type { TwoFactorRepository } from '../../domain/repository/two-factor.repository';

export interface VerifyTwoFactorCodeUseCaseInterface {
  Execute(command: TwoFactorCommandDTO): Promise<TwoFactorResultDTO>;
}

export class VerifyTwoFactorCodeUseCase implements VerifyTwoFactorCodeUseCaseInterface {
  constructor(private readonly repository: TwoFactorRepository) {}

  Execute(command: TwoFactorCommandDTO): Promise<TwoFactorResultDTO> {
    return this.repository.verifyCode(command);
  }
}
