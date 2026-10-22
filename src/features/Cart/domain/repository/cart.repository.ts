import type { ResourceResult } from '../../../../pkg/httpclient/http-client';
import type { CartId } from '../valueobject/cart-id';

export interface CartQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface CartCommand {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface CartRepository {
  getAll(query: CartQuery): Promise<ResourceResult>;
  getById(id: CartId, query: CartQuery): Promise<ResourceResult>;
  getByUserId(userId: string, query: CartQuery): Promise<ResourceResult>;
  add(command: CartCommand): Promise<ResourceResult>;
  replace(id: CartId, command: CartCommand): Promise<ResourceResult>;
  update(id: CartId, command: CartCommand): Promise<ResourceResult>;
  delete(id: CartId, command: CartCommand): Promise<ResourceResult>;
}
