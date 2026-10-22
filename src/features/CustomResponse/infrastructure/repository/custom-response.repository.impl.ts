import type {
  CustomResponseCommand,
  CustomResponseQuery,
  CustomResponseRepository,
} from '../../domain/repository/custom-response.repository';
import type { ResourceGateway, ResourceRequest, ResourceResult } from '../../../../pkg/httpclient/http-client';
export class CustomResponseRepositoryImpl implements CustomResponseRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/c'
  ) {}
  generate(command: CustomResponseCommand) {
    return this.forward({
      method: 'POST',
      pathAndQuery: `/generate${command.queryString ?? ''}`,
      headers: command.headers,
      body: command.body,
    });
  }
  getByIdentifier(identifier: string, query: CustomResponseQuery) {
    return this.forward({
      method: 'GET',
      pathAndQuery: `/${encodeURIComponent(identifier)}${query.queryString}`,
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
