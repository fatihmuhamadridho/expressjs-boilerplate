import type { GenerateImageDTO, ImageResultDTO } from '../dto/image.dto';
import type { ImageRepository } from '../image.interface';

export class GenerateImageUseCase {
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
