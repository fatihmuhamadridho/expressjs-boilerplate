import type { IconQuery, IconRepository } from '../../domain/repository/icon.repository';
import type { ResourceGateway, ResourceRequest, ResourceResult } from '../../../../pkg/httpclient/http-client';
export class IconRepositoryImpl implements IconRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/icon'
  ) {}
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
    return this.forward({
      method: 'GET',
      pathAndQuery: `${pathAndQuery}${query.queryString}`,
      headers: query.headers,
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
