import type { HttpQuery, HttpRepository } from '../../application/http.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';
export class HttpRepositoryImpl implements HttpRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/http') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
  getStatus(httpCode: string, query: HttpQuery) {
    return this.get(`/${encodeURIComponent(httpCode)}${query.queryString}`, query);
  }
  getStatusMessage(httpCode: string, message: string, query: HttpQuery) {
    return this.get(`/${encodeURIComponent(httpCode)}/${encodeURIComponent(message)}${query.queryString}`, query);
  }
  private get(pathAndQuery: string, query: HttpQuery) {
    return this.forwardRequest.forward({ method: 'GET', pathAndQuery, headers: query.headers });
  }
}
