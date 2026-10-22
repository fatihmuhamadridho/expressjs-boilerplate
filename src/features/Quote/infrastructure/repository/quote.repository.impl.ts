import type { QuoteQuery, QuoteRepository } from '../../domain/repository/quote.repository';
import type { ResourceGateway, ResourceRequest, ResourceResult } from '../../../../pkg/httpclient/http-client';
export class QuoteRepositoryImpl implements QuoteRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/quotes'
  ) {}
  getAll(query: QuoteQuery) {
    return this.get('/', query);
  }
  getById(id: string, query: QuoteQuery) {
    return this.get(`/${encodeURIComponent(id)}`, query);
  }
  getRandom(query: QuoteQuery) {
    return this.get('/random', query);
  }
  getRandomBatch(length: string, query: QuoteQuery) {
    return this.get(`/random/${encodeURIComponent(length)}`, query);
  }

  private get(pathAndQuery: string, query: QuoteQuery) {
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
