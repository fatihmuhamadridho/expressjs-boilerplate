import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface UserQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface UserCommand {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface DummyJsonUserRepository {
  getAll(query: UserQuery): Promise<DummyJsonResponse>;
  search(query: UserQuery): Promise<DummyJsonResponse>;
  filter(query: UserQuery): Promise<DummyJsonResponse>;
  getCurrentUser(query: UserQuery): Promise<DummyJsonResponse>;
  getById(id: string, query: UserQuery): Promise<DummyJsonResponse>;
  getCarts(userId: string, query: UserQuery): Promise<DummyJsonResponse>;
  getPosts(userId: string, query: UserQuery): Promise<DummyJsonResponse>;
  getTodos(userId: string, query: UserQuery): Promise<DummyJsonResponse>;
  add(command: UserCommand): Promise<DummyJsonResponse>;
  login(command: UserCommand): Promise<DummyJsonResponse>;
  replace(id: string, command: UserCommand): Promise<DummyJsonResponse>;
  update(id: string, command: UserCommand): Promise<DummyJsonResponse>;
  delete(id: string, command: UserCommand): Promise<DummyJsonResponse>;
}
