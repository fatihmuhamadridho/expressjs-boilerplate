import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export interface TwoFactorQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface TwoFactorCommand {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface TwoFactorRepository {
  generateCode(query: TwoFactorQuery): Promise<ResourceResult>;
  verifyCode(command: TwoFactorCommand): Promise<ResourceResult>;
}
