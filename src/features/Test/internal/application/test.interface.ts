import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface TestQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface TestCommand {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface TestRepository {
  get(query: TestQuery): Promise<DummyJsonResponse>;
  post(command: TestCommand): Promise<DummyJsonResponse>;
  put(command: TestCommand): Promise<DummyJsonResponse>;
  patch(command: TestCommand): Promise<DummyJsonResponse>;
  delete(command: TestCommand): Promise<DummyJsonResponse>;
}
