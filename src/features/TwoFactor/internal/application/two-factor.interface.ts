import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface TwoFactorQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface TwoFactorCommand {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface TwoFactorRepository {
  generateCode(query: TwoFactorQuery): Promise<DummyJsonResponse>;
  verifyCode(command: TwoFactorCommand): Promise<DummyJsonResponse>;
}
