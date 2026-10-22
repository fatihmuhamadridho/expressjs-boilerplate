import type { TestCommand, TestQuery, TestRepository } from '../../domain/repository/test.repository';
import type { ResourceGateway, ResourceRequest, ResourceResult } from '../../../../pkg/httpclient/http-client';
export class TestRepositoryImpl implements TestRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/test'
  ) {}
  get(query: TestQuery) {
    return this.forward({
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
    return this.forward({
      method,
      pathAndQuery: `/${command.queryString ?? ''}`,
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
