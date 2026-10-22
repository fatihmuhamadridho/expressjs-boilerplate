import type { AuthCommand, AuthQuery, AuthRepository } from '../../domain/repository/auth.repository';
import type { ResourceGateway, ResourceRequest, ResourceResult } from '../../../../pkg/httpclient/http-client';
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/auth'
  ) {}
  login(command: AuthCommand) {
    return this.send('POST', '/login', command);
  }
  logout(command: AuthCommand) {
    return this.send('POST', '/logout', command);
  }
  refresh(command: AuthCommand) {
    return this.send('POST', '/refresh', command);
  }
  getCurrentUser(query: AuthQuery) {
    return this.forward({
      method: 'GET',
      pathAndQuery: `/me${query.queryString}`,
      headers: query.headers,
    });
  }

  private send(method: 'POST', pathAndQuery: string, command: AuthCommand) {
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
