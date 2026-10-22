import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export interface UserQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface UserCommand {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface UserRepository {
  getAll(query: UserQuery): Promise<ResourceResult>;
  search(query: UserQuery): Promise<ResourceResult>;
  filter(query: UserQuery): Promise<ResourceResult>;
  getCurrentUser(query: UserQuery): Promise<ResourceResult>;
  getById(id: string, query: UserQuery): Promise<ResourceResult>;
  getCarts(userId: string, query: UserQuery): Promise<ResourceResult>;
  getPosts(userId: string, query: UserQuery): Promise<ResourceResult>;
  getTodos(userId: string, query: UserQuery): Promise<ResourceResult>;
  add(command: UserCommand): Promise<ResourceResult>;
  login(command: UserCommand): Promise<ResourceResult>;
  replace(id: string, command: UserCommand): Promise<ResourceResult>;
  update(id: string, command: UserCommand): Promise<ResourceResult>;
  delete(id: string, command: UserCommand): Promise<ResourceResult>;
}
