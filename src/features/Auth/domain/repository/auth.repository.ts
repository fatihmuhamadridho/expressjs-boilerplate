import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export interface AuthQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface AuthCommand {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface AuthRepository {
  login(command: AuthCommand): Promise<ResourceResult>;
  logout(command: AuthCommand): Promise<ResourceResult>;
  refresh(command: AuthCommand): Promise<ResourceResult>;
  getCurrentUser(query: AuthQuery): Promise<ResourceResult>;
}
