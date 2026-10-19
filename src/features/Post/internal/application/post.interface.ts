import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface PostQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface PostCommand {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface PostRepository {
  getAll(query: PostQuery): Promise<DummyJsonResponse>;
  search(query: PostQuery): Promise<DummyJsonResponse>;
  getTagList(query: PostQuery): Promise<DummyJsonResponse>;
  getTags(query: PostQuery): Promise<DummyJsonResponse>;
  getByTag(tag: string, query: PostQuery): Promise<DummyJsonResponse>;
  getByUserId(userId: string, query: PostQuery): Promise<DummyJsonResponse>;
  getComments(postId: string, query: PostQuery): Promise<DummyJsonResponse>;
  getById(id: string, query: PostQuery): Promise<DummyJsonResponse>;
  add(command: PostCommand): Promise<DummyJsonResponse>;
  replace(id: string, command: PostCommand): Promise<DummyJsonResponse>;
  update(id: string, command: PostCommand): Promise<DummyJsonResponse>;
  delete(id: string, command: PostCommand): Promise<DummyJsonResponse>;
}
