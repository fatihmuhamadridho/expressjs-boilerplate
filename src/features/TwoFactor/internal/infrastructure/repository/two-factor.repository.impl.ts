import type { TwoFactorCommand, TwoFactorQuery, TwoFactorRepository } from '../../application/two-factor.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';
export class TwoFactorRepositoryImpl implements TwoFactorRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/2fa') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
  generateCode(query: TwoFactorQuery) {
    return this.forwardRequest.forward({
      method: 'GET',
      pathAndQuery: `/${query.queryString}`,
      headers: query.headers,
    });
  }
  verifyCode(command: TwoFactorCommand) {
    return this.forwardRequest.forward({
      method: 'POST',
      pathAndQuery: '/',
      headers: command.headers,
      body: command.body,
    });
  }
}
