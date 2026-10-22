import type {
  TwoFactorCommand,
  TwoFactorQuery,
  TwoFactorRepository,
} from '../../domain/repository/two-factor.repository';
import type { ResourceGateway, ResourceRequest, ResourceResult } from '../../../../pkg/httpclient/http-client';
export class TwoFactorRepositoryImpl implements TwoFactorRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/2fa'
  ) {}
  generateCode(query: TwoFactorQuery) {
    return this.forward({
      method: 'GET',
      pathAndQuery: `/${query.queryString}`,
      headers: query.headers,
    });
  }
  verifyCode(command: TwoFactorCommand) {
    return this.forward({
      method: 'POST',
      pathAndQuery: `/${command.queryString ?? ''}`,
      headers: command.headers,
      body: command.body,
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
