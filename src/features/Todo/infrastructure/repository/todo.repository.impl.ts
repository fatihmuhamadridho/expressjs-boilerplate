import type { TodoCommand, TodoQuery, TodoRepository } from '../../domain/repository/todo.repository';
import type { ResourceGateway, ResourceRequest, ResourceResult } from '../../../../pkg/httpclient/http-client';
export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/todos'
  ) {}
  getAll(query: TodoQuery) {
    return this.get('/', query);
  }
  getById(id: string, query: TodoQuery) {
    return this.get(`/${encodeURIComponent(id)}`, query);
  }
  getRandom(query: TodoQuery) {
    return this.get('/random', query);
  }
  getRandomBatch(length: string, query: TodoQuery) {
    return this.get(`/random/${encodeURIComponent(length)}`, query);
  }
  getByUserId(userId: string, query: TodoQuery) {
    return this.get(`/user/${encodeURIComponent(userId)}`, query);
  }
  add(command: TodoCommand) {
    return this.send('POST', '/add', command);
  }
  replace(id: string, command: TodoCommand) {
    return this.send('PUT', `/${encodeURIComponent(id)}`, command);
  }
  update(id: string, command: TodoCommand) {
    return this.send('PATCH', `/${encodeURIComponent(id)}`, command);
  }
  delete(id: string, command: TodoCommand) {
    return this.send('DELETE', `/${encodeURIComponent(id)}`, command);
  }

  private get(pathAndQuery: string, query: TodoQuery) {
    return this.forward({
      method: 'GET',
      pathAndQuery: `${pathAndQuery}${query.queryString}`,
      headers: query.headers,
    });
  }

  private send(method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', pathAndQuery: string, command: TodoCommand) {
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
