import type {
  CustomResponseCommand,
  CustomResponseQuery,
  CustomResponseRepository,
} from '../../application/custom-response.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';
export class CustomResponseRepositoryImpl implements CustomResponseRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/c') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
  generate(command: CustomResponseCommand) {
    return this.forwardRequest.forward({
      method: 'POST',
      pathAndQuery: '/generate',
      headers: command.headers,
      body: command.body,
    });
  }
  getByIdentifier(identifier: string, query: CustomResponseQuery) {
    return this.forwardRequest.forward({
      method: 'GET',
      pathAndQuery: `/${encodeURIComponent(identifier)}${query.queryString}`,
      headers: query.headers,
    });
  }
}
