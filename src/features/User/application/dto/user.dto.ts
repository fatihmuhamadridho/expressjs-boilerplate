import type { ResourceResult } from '../../../../pkg/httpclient/http-client';
import type { UserCommand, UserQuery } from '../../domain/repository/user.repository';

export type UserQueryDTO = UserQuery;
export type UserCommandDTO = UserCommand;
export type UserResultDTO = ResourceResult;
