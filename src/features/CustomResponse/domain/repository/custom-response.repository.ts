import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export interface CustomResponseQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface CustomResponseCommand {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface CustomResponseRepository {
  generate(command: CustomResponseCommand): Promise<ResourceResult>;
  getByIdentifier(identifier: string, query: CustomResponseQuery): Promise<ResourceResult>;
}
