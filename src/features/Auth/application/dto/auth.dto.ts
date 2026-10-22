import type { AuthCommand, AuthQuery } from '../../domain/repository/auth.repository';
import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export type AuthQueryDTO = AuthQuery;
export type AuthCommandDTO = AuthCommand;
export type AuthResultDTO = ResourceResult;
