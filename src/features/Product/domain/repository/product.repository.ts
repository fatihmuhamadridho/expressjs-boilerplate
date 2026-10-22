import type { ResourceResult } from '../../../../pkg/httpclient/http-client';
import type { ProductId } from '../valueobject/product-id';

export interface ProductQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface ProductCommand {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

/** Port for Product use cases. Infrastructure owns HTTP and endpoint details. */
export interface ProductRepository {
  getAll(query: ProductQuery): Promise<ResourceResult>;
  search(query: ProductQuery): Promise<ResourceResult>;
  getById(id: ProductId, query: ProductQuery): Promise<ResourceResult>;
  getCategoryList(query: ProductQuery): Promise<ResourceResult>;
  getCategories(query: ProductQuery): Promise<ResourceResult>;
  getByCategory(category: string, query: ProductQuery): Promise<ResourceResult>;
  add(command: ProductCommand): Promise<ResourceResult>;
  replace(id: ProductId, command: ProductCommand): Promise<ResourceResult>;
  update(id: ProductId, command: ProductCommand): Promise<ResourceResult>;
  delete(id: ProductId, command: ProductCommand): Promise<ResourceResult>;
}
