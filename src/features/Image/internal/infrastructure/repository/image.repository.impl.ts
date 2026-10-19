import type { ImageQuery, ImageRepository } from '../../application/image.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';
export class ImageRepositoryImpl implements ImageRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/image') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
  generate(size: string, options: { background?: string; color?: string; type?: string }, query: ImageQuery) {
    const segments = [size, options.background, options.color, options.type]
      .filter((segment): segment is string => segment !== undefined)
      .map((segment) => encodeURIComponent(segment));
    const pathAndQuery = `/${segments.join('/')}${query.queryString}`;
    return this.forwardRequest.forward({ method: 'GET', pathAndQuery, headers: query.headers });
  }
}
