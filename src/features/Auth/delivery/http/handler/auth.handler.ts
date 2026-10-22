import type { RequestHandler } from 'express';
import { LoginHandler } from './login.handler';
import { LogoutHandler } from './logout.handler';
import { RefreshTokenHandler } from './refresh-token.handler';
import { GetCurrentUserHandler } from './get-current-user.handler';
import type { GetCurrentUserUseCaseInterface } from '../../../application/usecase/get-current-user.usecase';
import type { LoginUseCaseInterface } from '../../../application/usecase/login.usecase';
import type { LogoutUseCaseInterface } from '../../../application/usecase/logout.usecase';
import type { RefreshTokenUseCaseInterface } from '../../../application/usecase/refresh-token.usecase';
import type { AuthMapper } from '../mapper/auth.mapper';

export interface AuthUseCases {
  login: LoginUseCaseInterface;
  logout: LogoutUseCaseInterface;
  refresh: RefreshTokenUseCaseInterface;
  getCurrentUser: GetCurrentUserUseCaseInterface;
}

export class AuthHandler {
  readonly login: RequestHandler;
  readonly logout: RequestHandler;
  readonly refresh: RequestHandler;
  readonly getCurrentUser: RequestHandler;

  constructor(useCases: AuthUseCases, mapper: AuthMapper) {
    this.login = new LoginHandler(useCases.login, mapper).Handle;
    this.logout = new LogoutHandler(useCases.logout, mapper).Handle;
    this.refresh = new RefreshTokenHandler(useCases.refresh, mapper).Handle;
    this.getCurrentUser = new GetCurrentUserHandler(useCases.getCurrentUser, mapper).Handle;
  }
}
