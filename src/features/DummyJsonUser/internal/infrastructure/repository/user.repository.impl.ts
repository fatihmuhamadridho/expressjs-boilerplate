import type { DummyJsonUserRepository, UserCommand, UserQuery } from '../../application/user.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';

export class DummyJsonUserRepositoryImpl implements DummyJsonUserRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/users') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
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
    return this.forwardRequest.forward({
      method: 'GET',
      pathAndQuery: `${pathAndQuery}${query.queryString}`,
      headers: query.headers,
    });
  }

  private send(method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', pathAndQuery: string, command: UserCommand) {
    return this.forwardRequest.forward({ method, pathAndQuery, headers: command.headers, body: command.body });
  }
}
