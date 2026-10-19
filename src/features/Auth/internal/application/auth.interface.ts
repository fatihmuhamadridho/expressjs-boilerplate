import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface AuthQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface AuthCommand {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface AuthRepository {
  login(command: AuthCommand): Promise<DummyJsonResponse>;
  logout(command: AuthCommand): Promise<DummyJsonResponse>;
  refresh(command: AuthCommand): Promise<DummyJsonResponse>;
  getCurrentUser(query: AuthQuery): Promise<DummyJsonResponse>;
}
