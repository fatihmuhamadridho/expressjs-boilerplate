import type { ResourceResult } from '../../../../pkg/httpclient/http-client';
import type { TwoFactorCommand, TwoFactorQuery } from '../../domain/repository/two-factor.repository';

export type TwoFactorQueryDTO = TwoFactorQuery;
export type TwoFactorCommandDTO = TwoFactorCommand;
export type TwoFactorResultDTO = ResourceResult;
