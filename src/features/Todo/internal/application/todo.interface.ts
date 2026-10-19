import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface TodoQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface TodoCommand {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface TodoRepository {
  getAll(query: TodoQuery): Promise<DummyJsonResponse>;
  getById(id: string, query: TodoQuery): Promise<DummyJsonResponse>;
  getRandom(query: TodoQuery): Promise<DummyJsonResponse>;
  getRandomBatch(length: string, query: TodoQuery): Promise<DummyJsonResponse>;
  getByUserId(userId: string, query: TodoQuery): Promise<DummyJsonResponse>;
  add(command: TodoCommand): Promise<DummyJsonResponse>;
  replace(id: string, command: TodoCommand): Promise<DummyJsonResponse>;
  update(id: string, command: TodoCommand): Promise<DummyJsonResponse>;
  delete(id: string, command: TodoCommand): Promise<DummyJsonResponse>;
}
