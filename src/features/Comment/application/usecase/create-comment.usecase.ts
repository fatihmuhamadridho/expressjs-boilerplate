import type { CommentCommandDTO, CommentResultDTO } from '../dto/comment.dto';
import type { CommentRepository } from '../../domain/repository/comment.repository';

export interface CreateCommentUseCaseInterface {
  Execute(command: CommentCommandDTO): Promise<CommentResultDTO>;
}

export class CreateCommentUseCase implements CreateCommentUseCaseInterface {
  constructor(private readonly repository: CommentRepository) {}

  Execute(command: CommentCommandDTO): Promise<CommentResultDTO> {
    return this.repository.add(command);
  }
}
