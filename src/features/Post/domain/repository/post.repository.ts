import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export interface PostQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface PostCommand {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface PostRepository {
  getAll(query: PostQuery): Promise<ResourceResult>;
  search(query: PostQuery): Promise<ResourceResult>;
  getTagList(query: PostQuery): Promise<ResourceResult>;
  getTags(query: PostQuery): Promise<ResourceResult>;
  getByTag(tag: string, query: PostQuery): Promise<ResourceResult>;
  getByUserId(userId: string, query: PostQuery): Promise<ResourceResult>;
  getComments(postId: string, query: PostQuery): Promise<ResourceResult>;
  getById(id: string, query: PostQuery): Promise<ResourceResult>;
  add(command: PostCommand): Promise<ResourceResult>;
  replace(id: string, command: PostCommand): Promise<ResourceResult>;
  update(id: string, command: PostCommand): Promise<ResourceResult>;
  delete(id: string, command: PostCommand): Promise<ResourceResult>;
}
