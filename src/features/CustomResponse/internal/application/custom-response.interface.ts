import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface CustomResponseQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface CustomResponseCommand {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface CustomResponseRepository {
  generate(command: CustomResponseCommand): Promise<DummyJsonResponse>;
  getByIdentifier(identifier: string, query: CustomResponseQuery): Promise<DummyJsonResponse>;
}
