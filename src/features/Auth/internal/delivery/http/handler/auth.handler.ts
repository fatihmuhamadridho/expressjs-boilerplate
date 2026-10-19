import type { NextFunction, Request, Response } from 'express';
import {
  DummyJsonGatewayError,
  type DummyJsonResponse,
} from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import type { GetCurrentUserUseCaseInterface } from '../../../application/usecase/get-current-user.usecase';
import type { LoginUseCaseInterface } from '../../../application/usecase/login.usecase';
import type { LogoutUseCaseInterface } from '../../../application/usecase/logout.usecase';
import type { RefreshTokenUseCaseInterface } from '../../../application/usecase/refresh-token.usecase';
import { AuthMapper } from '../mapper/auth.mapper';

export interface AuthUseCases {
  login: LoginUseCaseInterface;
  logout: LogoutUseCaseInterface;
  refresh: RefreshTokenUseCaseInterface;
  getCurrentUser: GetCurrentUserUseCaseInterface;
}

export class AuthHandler {
  constructor(
    private readonly useCases: AuthUseCases,
    private readonly mapper: AuthMapper
  ) {}

  private execute =
    (work: (request: Request) => Promise<DummyJsonResponse>) =>
    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      try {
        writeDummyJsonResponse(response, await work(request));
      } catch (error) {
        if (error instanceof DummyJsonGatewayError) {
          response.status(error.kind === 'timeout' ? 504 : 502).json({ message: error.message });
          return;
        }
        next(error);
      }
    };

  login = this.execute((request) =>
    this.useCases.login.Execute(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request)))
  );
  logout = this.execute((request) =>
    this.useCases.logout.Execute(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request)))
  );
  refresh = this.execute((request) =>
    this.useCases.refresh.Execute(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request)))
  );
  getCurrentUser = this.execute((request) =>
    this.useCases.getCurrentUser.Execute(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request)))
  );
}
