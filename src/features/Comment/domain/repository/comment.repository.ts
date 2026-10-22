import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export interface CommentQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface CommentCommand {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface CommentRepository {
  getAll(query: CommentQuery): Promise<ResourceResult>;
  getById(id: string, query: CommentQuery): Promise<ResourceResult>;
  getByPostId(postId: string, query: CommentQuery): Promise<ResourceResult>;
  add(command: CommentCommand): Promise<ResourceResult>;
  replace(id: string, command: CommentCommand): Promise<ResourceResult>;
  update(id: string, command: CommentCommand): Promise<ResourceResult>;
  delete(id: string, command: CommentCommand): Promise<ResourceResult>;
}
