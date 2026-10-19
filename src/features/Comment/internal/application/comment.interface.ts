import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface CommentQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface CommentCommand {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface CommentRepository {
  getAll(query: CommentQuery): Promise<DummyJsonResponse>;
  getById(id: string, query: CommentQuery): Promise<DummyJsonResponse>;
  getByPostId(postId: string, query: CommentQuery): Promise<DummyJsonResponse>;
  add(command: CommentCommand): Promise<DummyJsonResponse>;
  replace(id: string, command: CommentCommand): Promise<DummyJsonResponse>;
  update(id: string, command: CommentCommand): Promise<DummyJsonResponse>;
  delete(id: string, command: CommentCommand): Promise<DummyJsonResponse>;
}
