import type { RequestHandler } from 'express';
import { GenerateTwoFactorCodeHandler } from './generate-two-factor-code.handler';
import { VerifyTwoFactorCodeHandler } from './verify-two-factor-code.handler';
import type {
  GenerateTwoFactorCodeUseCaseInterface,
  VerifyTwoFactorCodeUseCaseInterface,
} from '../../../application/usecase/two-factor.usecases';
import type { TwoFactorMapper } from '../mapper/two-factor.mapper';

export interface TwoFactorUseCases {
  generateCode: GenerateTwoFactorCodeUseCaseInterface;
  verifyCode: VerifyTwoFactorCodeUseCaseInterface;
}

export class TwoFactorHandler {
  readonly generateCode: RequestHandler;
  readonly verifyCode: RequestHandler;

  constructor(useCases: TwoFactorUseCases, mapper: TwoFactorMapper) {
    this.generateCode = new GenerateTwoFactorCodeHandler(useCases.generateCode, mapper).Handle;
    this.verifyCode = new VerifyTwoFactorCodeHandler(useCases.verifyCode, mapper).Handle;
  }
}
