import type { IpQuery, IpRepository } from '../../application/ip.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';
export class IpRepositoryImpl implements IpRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/ip') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
  lookup(query: IpQuery) {
    return this.forwardRequest.forward({
      method: 'GET',
      pathAndQuery: `/${query.queryString}`,
      headers: query.headers,
    });
  }
}
