import type { PostQueryDTO, PostResultDTO } from '../dto/post.dto';
import type { PostRepository } from '../../domain/repository/post.repository';

export interface GetPostDetailUseCaseInterface {
  Execute(id: string, query: PostQueryDTO): Promise<PostResultDTO>;
}

export class GetPostDetailUseCase implements GetPostDetailUseCaseInterface {
  constructor(private readonly repository: PostRepository) {}

  Execute(id: string, query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.getById(id, query);
  }
}
