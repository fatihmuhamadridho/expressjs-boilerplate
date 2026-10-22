import type { ImageQuery, ImageRepository } from '../../domain/repository/image.repository';
import type { ResourceGateway, ResourceRequest, ResourceResult } from '../../../../pkg/httpclient/http-client';
export class ImageRepositoryImpl implements ImageRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/image'
  ) {}
  generate(size: string, options: { background?: string; color?: string; type?: string }, query: ImageQuery) {
    const segments = [size, options.background, options.color, options.type]
      .filter((segment): segment is string => segment !== undefined)
      .map((segment) => encodeURIComponent(segment));
    const pathAndQuery = `/${segments.join('/')}${query.queryString}`;
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
