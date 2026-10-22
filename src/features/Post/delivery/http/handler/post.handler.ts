import type { RequestHandler } from 'express';
import { GetPostListHandler } from './get-post-list.handler';
import { SearchPostHandler } from './search-post.handler';
import { GetPostTagListHandler } from './get-post-tag-list.handler';
import { GetPostTagsHandler } from './get-post-tags.handler';
import { GetPostByTagHandler } from './get-post-by-tag.handler';
import { GetPostByUserIdHandler } from './get-post-by-user-id.handler';
import { GetPostCommentsHandler } from './get-post-comments.handler';
import { GetPostDetailHandler } from './get-post-detail.handler';
import { CreatePostHandler } from './create-post.handler';
import { ReplacePostHandler } from './replace-post.handler';
import { UpdatePostHandler } from './update-post.handler';
import { DeletePostHandler } from './delete-post.handler';
import type {
  GetPostListUseCaseInterface,
  SearchPostUseCaseInterface,
  GetPostTagListUseCaseInterface,
  GetPostTagsUseCaseInterface,
  GetPostByTagUseCaseInterface,
  GetPostByUserIdUseCaseInterface,
  GetPostCommentsUseCaseInterface,
  GetPostDetailUseCaseInterface,
  CreatePostUseCaseInterface,
  ReplacePostUseCaseInterface,
  UpdatePostUseCaseInterface,
  DeletePostUseCaseInterface,
} from '../../../application/usecase/post.usecases';
import type { PostMapper } from '../mapper/post.mapper';

export interface PostUseCases {
  getAll: GetPostListUseCaseInterface;
  search: SearchPostUseCaseInterface;
  getTagList: GetPostTagListUseCaseInterface;
  getTags: GetPostTagsUseCaseInterface;
  getByTag: GetPostByTagUseCaseInterface;
  getByUserId: GetPostByUserIdUseCaseInterface;
  getComments: GetPostCommentsUseCaseInterface;
  getById: GetPostDetailUseCaseInterface;
  add: CreatePostUseCaseInterface;
  replace: ReplacePostUseCaseInterface;
  update: UpdatePostUseCaseInterface;
  delete: DeletePostUseCaseInterface;
}

export class PostHandler {
  readonly getAll: RequestHandler;
  readonly search: RequestHandler;
  readonly getTagList: RequestHandler;
  readonly getTags: RequestHandler;
  readonly getByTag: RequestHandler;
  readonly getByUserId: RequestHandler;
  readonly getComments: RequestHandler;
  readonly getById: RequestHandler;
  readonly add: RequestHandler;
  readonly replace: RequestHandler;
  readonly update: RequestHandler;
  readonly delete: RequestHandler;

  constructor(useCases: PostUseCases, mapper: PostMapper) {
    this.getAll = new GetPostListHandler(useCases.getAll, mapper).Handle;
    this.search = new SearchPostHandler(useCases.search, mapper).Handle;
    this.getTagList = new GetPostTagListHandler(useCases.getTagList, mapper).Handle;
    this.getTags = new GetPostTagsHandler(useCases.getTags, mapper).Handle;
    this.getByTag = new GetPostByTagHandler(useCases.getByTag, mapper).Handle;
    this.getByUserId = new GetPostByUserIdHandler(useCases.getByUserId, mapper).Handle;
    this.getComments = new GetPostCommentsHandler(useCases.getComments, mapper).Handle;
    this.getById = new GetPostDetailHandler(useCases.getById, mapper).Handle;
    this.add = new CreatePostHandler(useCases.add, mapper).Handle;
    this.replace = new ReplacePostHandler(useCases.replace, mapper).Handle;
    this.update = new UpdatePostHandler(useCases.update, mapper).Handle;
    this.delete = new DeletePostHandler(useCases.delete, mapper).Handle;
  }
}
