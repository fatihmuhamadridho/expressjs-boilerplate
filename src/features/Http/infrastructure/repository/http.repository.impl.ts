import type { HttpQuery, HttpRepository } from '../../domain/repository/http.repository';
import type { ResourceGateway, ResourceRequest, ResourceResult } from '../../../../pkg/httpclient/http-client';
export class HttpRepositoryImpl implements HttpRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/http'
  ) {}
  getStatus(httpCode: string, query: HttpQuery) {
    return this.get(`/${encodeURIComponent(httpCode)}${query.queryString}`, query);
  }
  getStatusMessage(httpCode: string, message: string, query: HttpQuery) {
    return this.get(`/${encodeURIComponent(httpCode)}/${encodeURIComponent(message)}${query.queryString}`, query);
  }
  private get(pathAndQuery: string, query: HttpQuery) {
    return this.forward({ method: 'GET', pathAndQuery, headers: query.headers });
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
