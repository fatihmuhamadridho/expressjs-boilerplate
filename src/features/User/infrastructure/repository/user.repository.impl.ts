import type { UserRepository, UserCommand, UserQuery } from '../../domain/repository/user.repository';
import type { ResourceGateway, ResourceRequest, ResourceResult } from '../../../../pkg/httpclient/http-client';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/users'
  ) {}
  getAll(query: UserQuery) {
    return this.get('/', query);
  }
  search(query: UserQuery) {
    return this.get('/search', query);
  }
  filter(query: UserQuery) {
    return this.get('/filter', query);
  }
  getCurrentUser(query: UserQuery) {
    return this.get('/me', query);
  }
  getById(id: string, query: UserQuery) {
    return this.get(`/${encodeURIComponent(id)}`, query);
  }
  getCarts(userId: string, query: UserQuery) {
    return this.get(`/${encodeURIComponent(userId)}/carts`, query);
  }
  getPosts(userId: string, query: UserQuery) {
    return this.get(`/${encodeURIComponent(userId)}/posts`, query);
  }
  getTodos(userId: string, query: UserQuery) {
    return this.get(`/${encodeURIComponent(userId)}/todos`, query);
  }
  add(command: UserCommand) {
    return this.send('POST', '/add', command);
  }
  login(command: UserCommand) {
    return this.send('POST', '/login', command);
  }
  replace(id: string, command: UserCommand) {
    return this.send('PUT', `/${encodeURIComponent(id)}`, command);
  }
  update(id: string, command: UserCommand) {
    return this.send('PATCH', `/${encodeURIComponent(id)}`, command);
  }
  delete(id: string, command: UserCommand) {
    return this.send('DELETE', `/${encodeURIComponent(id)}`, command);
  }

  private get(pathAndQuery: string, query: UserQuery) {
    return this.forward({
      method: 'GET',
      pathAndQuery: `${pathAndQuery}${query.queryString}`,
      headers: query.headers,
    });
  }

  private send(method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', pathAndQuery: string, command: UserCommand) {
    return this.forward({
      method,
      pathAndQuery: `${pathAndQuery}${command.queryString ?? ''}`,
      headers: command.headers,
      body: command.body,
    });
  }

  private forward(request: ResourceRequest): Promise<ResourceResult> {
    const resourcePath =
      request.pathAndQuery === '/'
        ? ''
        : request.pathAndQuery.startsWith('/?')
          ? request.pathAndQuery.slice(1)
          : request.pathAndQuery;
    return this.gateway.forward({ ...request, pathAndQuery: `${this.basePath}${resourcePath}` });
  }
}
