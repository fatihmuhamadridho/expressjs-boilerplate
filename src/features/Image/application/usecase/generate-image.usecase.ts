import type { GenerateImageDTO, ImageResultDTO } from '../dto/image.dto';
import type { ImageRepository } from '../../domain/repository/image.repository';

export interface GenerateImageUseCaseInterface {
  Execute(input: GenerateImageDTO): Promise<ImageResultDTO>;
}

export class GenerateImageUseCase implements GenerateImageUseCaseInterface {
  constructor(private readonly repository: ImageRepository) {}
  Execute(input: GenerateImageDTO): Promise<ImageResultDTO> {
    return this.repository.generate(
      input.size,
      {
        background: input.background,
        color: input.color,
        type: input.type,
      },
      input.query
    );
  }
}
