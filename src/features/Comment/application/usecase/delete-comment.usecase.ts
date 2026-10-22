import type { CommentCommandDTO, CommentResultDTO } from '../dto/comment.dto';
import type { CommentRepository } from '../../domain/repository/comment.repository';

export interface DeleteCommentUseCaseInterface {
  Execute(id: string, command: CommentCommandDTO): Promise<CommentResultDTO>;
}

export class DeleteCommentUseCase implements DeleteCommentUseCaseInterface {
  constructor(private readonly repository: CommentRepository) {}

  Execute(id: string, command: CommentCommandDTO): Promise<CommentResultDTO> {
    return this.repository.delete(id, command);
  }
}
