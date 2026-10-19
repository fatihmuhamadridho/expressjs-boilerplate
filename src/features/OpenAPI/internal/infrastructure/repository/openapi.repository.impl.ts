import type { OpenAPIQuery, OpenAPIRepository } from '../../application/openapi.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';
export class OpenAPIRepositoryImpl implements OpenAPIRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/openapi.json') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
  getSpec(query: OpenAPIQuery) {
    return this.forwardRequest.forward({
      method: 'GET',
      pathAndQuery: `/${query.queryString}`,
      headers: query.headers,
    });
  }
}
