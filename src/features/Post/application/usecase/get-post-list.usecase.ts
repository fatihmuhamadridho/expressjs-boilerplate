import type { PostQueryDTO, PostResultDTO } from '../dto/post.dto';
import type { PostRepository } from '../../domain/repository/post.repository';

export interface GetPostListUseCaseInterface {
  Execute(query: PostQueryDTO): Promise<PostResultDTO>;
}

export class GetPostListUseCase implements GetPostListUseCaseInterface {
  constructor(private readonly repository: PostRepository) {}

  Execute(query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.getAll(query);
  }
}
