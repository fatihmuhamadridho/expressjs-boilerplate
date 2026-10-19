import type { PostCommand, PostQuery, PostRepository } from '../../application/post.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';
export class PostRepositoryImpl implements PostRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/posts') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
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
    return this.forwardRequest.forward({
      method: 'GET',
      pathAndQuery: `${pathAndQuery}${query.queryString}`,
      headers: query.headers,
    });
  }

  private send(method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', pathAndQuery: string, command: PostCommand) {
    return this.forwardRequest.forward({ method, pathAndQuery, headers: command.headers, body: command.body });
  }
}
