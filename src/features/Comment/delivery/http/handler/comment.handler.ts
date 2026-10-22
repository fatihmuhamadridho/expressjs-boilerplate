import type { RequestHandler } from 'express';
import { GetCommentListHandler } from './get-comment-list.handler';
import { GetCommentDetailHandler } from './get-comment-detail.handler';
import { GetCommentByPostIdHandler } from './get-comment-by-post-id.handler';
import { CreateCommentHandler } from './create-comment.handler';
import { ReplaceCommentHandler } from './replace-comment.handler';
import { UpdateCommentHandler } from './update-comment.handler';
import { DeleteCommentHandler } from './delete-comment.handler';
import type {
  GetCommentListUseCaseInterface,
  GetCommentDetailUseCaseInterface,
  GetCommentByPostIdUseCaseInterface,
  CreateCommentUseCaseInterface,
  ReplaceCommentUseCaseInterface,
  UpdateCommentUseCaseInterface,
  DeleteCommentUseCaseInterface,
} from '../../../application/usecase/comment.usecases';
import type { CommentMapper } from '../mapper/comment.mapper';

export interface CommentUseCases {
  getAll: GetCommentListUseCaseInterface;
  getById: GetCommentDetailUseCaseInterface;
  getByPostId: GetCommentByPostIdUseCaseInterface;
  add: CreateCommentUseCaseInterface;
  replace: ReplaceCommentUseCaseInterface;
  update: UpdateCommentUseCaseInterface;
  delete: DeleteCommentUseCaseInterface;
}

export class CommentHandler {
  readonly getAll: RequestHandler;
  readonly getById: RequestHandler;
  readonly getByPostId: RequestHandler;
  readonly add: RequestHandler;
  readonly replace: RequestHandler;
  readonly update: RequestHandler;
  readonly delete: RequestHandler;

  constructor(useCases: CommentUseCases, mapper: CommentMapper) {
    this.getAll = new GetCommentListHandler(useCases.getAll, mapper).Handle;
    this.getById = new GetCommentDetailHandler(useCases.getById, mapper).Handle;
    this.getByPostId = new GetCommentByPostIdHandler(useCases.getByPostId, mapper).Handle;
    this.add = new CreateCommentHandler(useCases.add, mapper).Handle;
    this.replace = new ReplaceCommentHandler(useCases.replace, mapper).Handle;
    this.update = new UpdateCommentHandler(useCases.update, mapper).Handle;
    this.delete = new DeleteCommentHandler(useCases.delete, mapper).Handle;
  }
}
