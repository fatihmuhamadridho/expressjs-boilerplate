import type { PostQueryDTO, PostResultDTO } from '../dto/post.dto';
import type { PostRepository } from '../../domain/repository/post.repository';

export interface GetPostByUserIdUseCaseInterface {
  Execute(userId: string, query: PostQueryDTO): Promise<PostResultDTO>;
}

export class GetPostByUserIdUseCase implements GetPostByUserIdUseCaseInterface {
  constructor(private readonly repository: PostRepository) {}

  Execute(userId: string, query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.getByUserId(userId, query);
  }
}
