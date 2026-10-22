import type { CommentQueryDTO, CommentResultDTO } from '../dto/comment.dto';
import type { CommentRepository } from '../../domain/repository/comment.repository';

export interface GetCommentByPostIdUseCaseInterface {
  Execute(postId: string, query: CommentQueryDTO): Promise<CommentResultDTO>;
}

export class GetCommentByPostIdUseCase implements GetCommentByPostIdUseCaseInterface {
  constructor(private readonly repository: CommentRepository) {}

  Execute(postId: string, query: CommentQueryDTO): Promise<CommentResultDTO> {
    return this.repository.getByPostId(postId, query);
  }
}
