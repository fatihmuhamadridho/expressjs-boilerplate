import type { IconQuery, IconRepository } from '../../application/icon.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';
export class IconRepositoryImpl implements IconRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/icon') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
  getDefault(query: IconQuery) {
    return this.get('/', query);
  }
  getByHash(hash: string, query: IconQuery) {
    return this.get(`/${encodeURIComponent(hash)}`, query);
  }
  getByHashAndSize(hash: string, size: string, query: IconQuery) {
    return this.get(`/${encodeURIComponent(hash)}/${encodeURIComponent(size)}`, query);
  }
  private get(pathAndQuery: string, query: IconQuery) {
    return this.forwardRequest.forward({
      method: 'GET',
      pathAndQuery: `${pathAndQuery}${query.queryString}`,
      headers: query.headers,
    });
  }
}
