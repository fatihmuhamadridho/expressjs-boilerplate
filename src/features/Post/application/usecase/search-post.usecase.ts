import type { PostQueryDTO, PostResultDTO } from '../dto/post.dto';
import type { PostRepository } from '../../domain/repository/post.repository';

export interface SearchPostUseCaseInterface {
  Execute(query: PostQueryDTO): Promise<PostResultDTO>;
}

export class SearchPostUseCase implements SearchPostUseCaseInterface {
  constructor(private readonly repository: PostRepository) {}

  Execute(query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.search(query);
  }
}
