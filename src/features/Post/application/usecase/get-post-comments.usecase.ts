import type { PostQueryDTO, PostResultDTO } from '../dto/post.dto';
import type { PostRepository } from '../../domain/repository/post.repository';

export interface GetPostCommentsUseCaseInterface {
  Execute(postId: string, query: PostQueryDTO): Promise<PostResultDTO>;
}

export class GetPostCommentsUseCase implements GetPostCommentsUseCaseInterface {
  constructor(private readonly repository: PostRepository) {}

  Execute(postId: string, query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.getComments(postId, query);
  }
}
