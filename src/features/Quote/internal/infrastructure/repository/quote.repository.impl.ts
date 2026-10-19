import type { QuoteQuery, QuoteRepository } from '../../application/quote.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';
export class QuoteRepositoryImpl implements QuoteRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/quotes') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
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
    return this.forwardRequest.forward({
      method: 'GET',
      pathAndQuery: `${pathAndQuery}${query.queryString}`,
      headers: query.headers,
    });
  }
}
