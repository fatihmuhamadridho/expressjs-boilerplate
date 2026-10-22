import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export interface TestQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface TestCommand {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface TestRepository {
  get(query: TestQuery): Promise<ResourceResult>;
  post(command: TestCommand): Promise<ResourceResult>;
  put(command: TestCommand): Promise<ResourceResult>;
  patch(command: TestCommand): Promise<ResourceResult>;
  delete(command: TestCommand): Promise<ResourceResult>;
}
