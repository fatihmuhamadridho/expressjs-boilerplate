import type { CommentCommand, CommentQuery, CommentRepository } from '../../domain/repository/comment.repository';
import type { ResourceGateway, ResourceRequest, ResourceResult } from '../../../../pkg/httpclient/http-client';
export class CommentRepositoryImpl implements CommentRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/comments'
  ) {}
  getAll(query: CommentQuery) {
    return this.get('/', query);
  }
  getById(id: string, query: CommentQuery) {
    return this.get(`/${encodeURIComponent(id)}`, query);
  }
  getByPostId(postId: string, query: CommentQuery) {
    return this.get(`/post/${encodeURIComponent(postId)}`, query);
  }
  add(command: CommentCommand) {
    return this.send('POST', '/add', command);
  }
  replace(id: string, command: CommentCommand) {
    return this.send('PUT', `/${encodeURIComponent(id)}`, command);
  }
  update(id: string, command: CommentCommand) {
    return this.send('PATCH', `/${encodeURIComponent(id)}`, command);
  }
  delete(id: string, command: CommentCommand) {
    return this.send('DELETE', `/${encodeURIComponent(id)}`, command);
  }

  private get(pathAndQuery: string, query: CommentQuery) {
    return this.forward({
      method: 'GET',
      pathAndQuery: `${pathAndQuery}${query.queryString}`,
      headers: query.headers,
    });
  }

  private send(method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', pathAndQuery: string, command: CommentCommand) {
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
