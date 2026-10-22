import type { PostCommand, PostQuery, PostRepository } from '../../domain/repository/post.repository';
import type { ResourceGateway, ResourceRequest, ResourceResult } from '../../../../pkg/httpclient/http-client';
export class PostRepositoryImpl implements PostRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/posts'
  ) {}
  getAll(query: PostQuery) {
    return this.get('/', query);
  }
  search(query: PostQuery) {
    return this.get('/search', query);
  }
  getTagList(query: PostQuery) {
    return this.get('/tag-list', query);
  }
  getTags(query: PostQuery) {
    return this.get('/tags', query);
  }
  getByTag(tag: string, query: PostQuery) {
    return this.get(`/tag/${encodeURIComponent(tag)}`, query);
  }
  getByUserId(userId: string, query: PostQuery) {
    return this.get(`/user/${encodeURIComponent(userId)}`, query);
  }
  getComments(postId: string, query: PostQuery) {
    return this.get(`/${encodeURIComponent(postId)}/comments`, query);
  }
  getById(id: string, query: PostQuery) {
    return this.get(`/${encodeURIComponent(id)}`, query);
  }
  add(command: PostCommand) {
    return this.send('POST', '/add', command);
  }
  replace(id: string, command: PostCommand) {
    return this.send('PUT', `/${encodeURIComponent(id)}`, command);
  }
  update(id: string, command: PostCommand) {
    return this.send('PATCH', `/${encodeURIComponent(id)}`, command);
  }
  delete(id: string, command: PostCommand) {
    return this.send('DELETE', `/${encodeURIComponent(id)}`, command);
  }

  private get(pathAndQuery: string, query: PostQuery) {
    return this.forward({
      method: 'GET',
      pathAndQuery: `${pathAndQuery}${query.queryString}`,
      headers: query.headers,
    });
  }

  private send(method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', pathAndQuery: string, command: PostCommand) {
    return this.forward({
      method,
      pathAndQuery: `${pathAndQuery}${command.queryString ?? ''}`,
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
