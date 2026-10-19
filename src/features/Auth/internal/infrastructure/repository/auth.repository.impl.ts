import type { AuthCommand, AuthQuery, AuthRepository } from '../../application/auth.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';
export class AuthRepositoryImpl implements AuthRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/auth') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
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
    return this.forwardRequest.forward({
      method: 'GET',
      pathAndQuery: `/me${query.queryString}`,
      headers: query.headers,
    });
  }

  private send(method: 'POST', pathAndQuery: string, command: AuthCommand) {
    return this.forwardRequest.forward({ method, pathAndQuery, headers: command.headers, body: command.body });
  }
}
