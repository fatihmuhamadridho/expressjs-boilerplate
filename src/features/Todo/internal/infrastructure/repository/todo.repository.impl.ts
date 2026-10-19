import type { TodoCommand, TodoQuery, TodoRepository } from '../../application/todo.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';
export class TodoRepositoryImpl implements TodoRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/todos') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
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
    return this.forwardRequest.forward({
      method: 'GET',
      pathAndQuery: `${pathAndQuery}${query.queryString}`,
      headers: query.headers,
    });
  }

  private send(method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', pathAndQuery: string, command: TodoCommand) {
    return this.forwardRequest.forward({ method, pathAndQuery, headers: command.headers, body: command.body });
  }
}
