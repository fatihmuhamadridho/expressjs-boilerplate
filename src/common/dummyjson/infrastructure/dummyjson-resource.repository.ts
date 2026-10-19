import type { DummyJsonGateway, DummyJsonRequest, DummyJsonResponse } from '../application/dummyjson.interface';

/** Infrastructure adapter scopes a feature request to its upstream resource. */
export class DummyJsonResourceRepositoryAdapter {
  constructor(
    private readonly gateway: DummyJsonGateway,
    private readonly basePath: string
  ) {}

  forward(request: DummyJsonRequest): Promise<DummyJsonResponse> {
    const resourcePath =
      request.pathAndQuery === '/'
        ? ''
        : request.pathAndQuery.startsWith('/?')
          ? request.pathAndQuery.slice(1)
          : request.pathAndQuery;

    return this.gateway.forward({
      ...request,
      pathAndQuery: `${this.basePath}${resourcePath}`,
    });
  }
}
