import type { PostQueryDTO, PostResultDTO } from '../dto/post.dto';
import type { PostRepository } from '../../domain/repository/post.repository';

export interface GetPostByTagUseCaseInterface {
  Execute(tag: string, query: PostQueryDTO): Promise<PostResultDTO>;
}

export class GetPostByTagUseCase implements GetPostByTagUseCaseInterface {
  constructor(private readonly repository: PostRepository) {}

  Execute(tag: string, query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.getByTag(tag, query);
  }
}
