import type {
  DummyJsonGateway,
  DummyJsonResponse,
} from '../../../../../common/dummyjson/application/dummyjson.interface';
import type { ProductCommand, ProductQuery, ProductRepository } from '../../../domain/repository/product.repository';
import type { ProductId } from '../../../domain/valueobject/product-id';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    private readonly gateway: DummyJsonGateway,
    private readonly basePath = '/products'
  ) {}

  getAll(query: ProductQuery): Promise<DummyJsonResponse> {
    return this.get('/', query);
  }
  search(query: ProductQuery): Promise<DummyJsonResponse> {
    return this.get('/search', query);
  }
  getById(id: ProductId, query: ProductQuery): Promise<DummyJsonResponse> {
    return this.get(`/${encodeURIComponent(id.toString())}`, query);
  }
  getCategoryList(query: ProductQuery): Promise<DummyJsonResponse> {
    return this.get('/category-list', query);
  }
  getCategories(query: ProductQuery): Promise<DummyJsonResponse> {
    return this.get('/categories', query);
  }
  getByCategory(category: string, query: ProductQuery): Promise<DummyJsonResponse> {
    return this.get(`/category/${encodeURIComponent(category)}`, query);
  }
  add(command: ProductCommand): Promise<DummyJsonResponse> {
    return this.send('POST', '/add', command);
  }
  replace(id: ProductId, command: ProductCommand): Promise<DummyJsonResponse> {
    return this.send('PUT', `/${encodeURIComponent(id.toString())}`, command);
  }
  update(id: ProductId, command: ProductCommand): Promise<DummyJsonResponse> {
    return this.send('PATCH', `/${encodeURIComponent(id.toString())}`, command);
  }
  delete(id: ProductId, command: ProductCommand): Promise<DummyJsonResponse> {
    return this.send('DELETE', `/${encodeURIComponent(id.toString())}`, command);
  }

  private get(path: string, query: ProductQuery): Promise<DummyJsonResponse> {
    return this.gateway.forward({
      method: 'GET',
      pathAndQuery: this.joinPath(path, query.queryString),
      headers: query.headers,
    });
  }

  private send(
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    command: ProductCommand
  ): Promise<DummyJsonResponse> {
    return this.gateway.forward({
      method,
      pathAndQuery: this.joinPath(path),
      headers: command.headers,
      body: command.body,
    });
  }

  private joinPath(path: string, queryString = ''): string {
    const base = this.basePath === '/' ? '' : this.basePath.replace(/\/$/, '');
    const suffix = path === '/' ? '' : path;
    return `${base}${suffix}${queryString}` || '/';
  }
}
