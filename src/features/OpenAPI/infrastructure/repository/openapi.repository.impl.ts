import type { OpenAPIQuery, OpenAPIRepository } from '../../domain/repository/openapi.repository';
import type { ResourceGateway, ResourceRequest, ResourceResult } from '../../../../pkg/httpclient/http-client';
export class OpenAPIRepositoryImpl implements OpenAPIRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/openapi.json'
  ) {}
  getSpec(query: OpenAPIQuery) {
    return this.forward({
      method: 'GET',
      pathAndQuery: `/${query.queryString}`,
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
