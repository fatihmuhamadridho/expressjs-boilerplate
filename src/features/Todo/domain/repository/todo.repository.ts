import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export interface TodoQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface TodoCommand {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface TodoRepository {
  getAll(query: TodoQuery): Promise<ResourceResult>;
  getById(id: string, query: TodoQuery): Promise<ResourceResult>;
  getRandom(query: TodoQuery): Promise<ResourceResult>;
  getRandomBatch(length: string, query: TodoQuery): Promise<ResourceResult>;
  getByUserId(userId: string, query: TodoQuery): Promise<ResourceResult>;
  add(command: TodoCommand): Promise<ResourceResult>;
  replace(id: string, command: TodoCommand): Promise<ResourceResult>;
  update(id: string, command: TodoCommand): Promise<ResourceResult>;
  delete(id: string, command: TodoCommand): Promise<ResourceResult>;
}
