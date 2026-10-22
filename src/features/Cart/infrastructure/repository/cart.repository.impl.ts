import type { ResourceGateway, ResourceResult } from '../../../../pkg/httpclient/http-client';
import type { CartCommand, CartQuery, CartRepository } from '../../domain/repository/cart.repository';
import type { CartId } from '../../domain/valueobject/cart-id';

export class CartRepositoryImpl implements CartRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/carts'
  ) {}
  getAll(query: CartQuery): Promise<ResourceResult> {
    return this.get('/', query);
  }
  getById(id: CartId, query: CartQuery): Promise<ResourceResult> {
    return this.get(`/${id.toString()}`, query);
  }
  getByUserId(userId: string, query: CartQuery): Promise<ResourceResult> {
    return this.get(`/user/${encodeURIComponent(userId)}`, query);
  }
  add(command: CartCommand): Promise<ResourceResult> {
    return this.send('POST', '/add', command);
  }
  replace(id: CartId, command: CartCommand): Promise<ResourceResult> {
    return this.send('PUT', `/${id.toString()}`, command);
  }
  update(id: CartId, command: CartCommand): Promise<ResourceResult> {
    return this.send('PATCH', `/${id.toString()}`, command);
  }
  delete(id: CartId, command: CartCommand): Promise<ResourceResult> {
    return this.send('DELETE', `/${id.toString()}`, command);
  }

  private get(path: string, query: CartQuery): Promise<ResourceResult> {
    return this.gateway.forward({
      method: 'GET',
      pathAndQuery: this.path(path, query.queryString),
      headers: query.headers,
    });
  }
  private send(
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    command: CartCommand
  ): Promise<ResourceResult> {
    return this.gateway.forward({
      method,
      pathAndQuery: this.path(path, command.queryString),
      headers: command.headers,
      body: command.body,
    });
  }
  private path(path: string, query = ''): string {
    return `${this.basePath}${path === '/' ? '' : path}${query}`;
  }
}
