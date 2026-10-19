import type { TestCommand, TestQuery, TestRepository } from '../../application/test.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';
export class TestRepositoryImpl implements TestRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/test') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
  get(query: TestQuery) {
    return this.forwardRequest.forward({
      method: 'GET',
      pathAndQuery: `/${query.queryString}`,
      headers: query.headers,
    });
  }
  post(command: TestCommand) {
    return this.send('POST', command);
  }
  put(command: TestCommand) {
    return this.send('PUT', command);
  }
  patch(command: TestCommand) {
    return this.send('PATCH', command);
  }
  delete(command: TestCommand) {
    return this.send('DELETE', command);
  }
  private send(method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', command: TestCommand) {
    return this.forwardRequest.forward({ method, pathAndQuery: '/', headers: command.headers, body: command.body });
  }
}
