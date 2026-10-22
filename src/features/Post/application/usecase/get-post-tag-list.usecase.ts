import type { PostQueryDTO, PostResultDTO } from '../dto/post.dto';
import type { PostRepository } from '../../domain/repository/post.repository';

export interface GetPostTagListUseCaseInterface {
  Execute(query: PostQueryDTO): Promise<PostResultDTO>;
}

export class GetPostTagListUseCase implements GetPostTagListUseCaseInterface {
  constructor(private readonly repository: PostRepository) {}

  Execute(query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.getTagList(query);
  }
}
