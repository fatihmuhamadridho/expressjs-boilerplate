import type { CommentCommand, CommentQuery, CommentRepository } from '../../application/comment.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';
export class CommentRepositoryImpl implements CommentRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/comments') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
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
    return this.forwardRequest.forward({
      method: 'GET',
      pathAndQuery: `${pathAndQuery}${query.queryString}`,
      headers: query.headers,
    });
  }

  private send(method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', pathAndQuery: string, command: CommentCommand) {
    return this.forwardRequest.forward({ method, pathAndQuery, headers: command.headers, body: command.body });
  }
}
