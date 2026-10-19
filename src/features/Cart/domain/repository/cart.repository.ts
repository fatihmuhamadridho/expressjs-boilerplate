import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';
import type { CartId } from '../valueobject/cart-id';

export interface CartQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface CartCommand {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface CartRepository {
  getAll(query: CartQuery): Promise<DummyJsonResponse>;
  getById(id: CartId, query: CartQuery): Promise<DummyJsonResponse>;
  getByUserId(userId: string, query: CartQuery): Promise<DummyJsonResponse>;
  add(command: CartCommand): Promise<DummyJsonResponse>;
  replace(id: CartId, command: CartCommand): Promise<DummyJsonResponse>;
  update(id: CartId, command: CartCommand): Promise<DummyJsonResponse>;
  delete(id: CartId, command: CartCommand): Promise<DummyJsonResponse>;
}
