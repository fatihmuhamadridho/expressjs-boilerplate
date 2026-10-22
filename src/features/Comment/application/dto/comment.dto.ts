import type { ResourceResult } from '../../../../pkg/httpclient/http-client';
import type { CommentCommand, CommentQuery } from '../../domain/repository/comment.repository';

export type CommentQueryDTO = CommentQuery;
export type CommentCommandDTO = CommentCommand;
export type CommentResultDTO = ResourceResult;
