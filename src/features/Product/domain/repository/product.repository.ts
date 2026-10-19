import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';
import type { ProductId } from '../valueobject/product-id';

export interface ProductQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface ProductCommand {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

/** Port for Product use cases. Infrastructure owns HTTP and endpoint details. */
export interface ProductRepository {
  getAll(query: ProductQuery): Promise<DummyJsonResponse>;
  search(query: ProductQuery): Promise<DummyJsonResponse>;
  getById(id: ProductId, query: ProductQuery): Promise<DummyJsonResponse>;
  getCategoryList(query: ProductQuery): Promise<DummyJsonResponse>;
  getCategories(query: ProductQuery): Promise<DummyJsonResponse>;
  getByCategory(category: string, query: ProductQuery): Promise<DummyJsonResponse>;
  add(command: ProductCommand): Promise<DummyJsonResponse>;
  replace(id: ProductId, command: ProductCommand): Promise<DummyJsonResponse>;
  update(id: ProductId, command: ProductCommand): Promise<DummyJsonResponse>;
  delete(id: ProductId, command: ProductCommand): Promise<DummyJsonResponse>;
}
