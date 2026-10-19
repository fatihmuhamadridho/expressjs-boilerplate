import type { OpenAPIQueryDTO, OpenAPIResultDTO } from '../dto/openapi.dto';
import type { OpenAPIRepository } from '../openapi.interface';

export class GetOpenAPISpecUseCase {
  constructor(private readonly repository: OpenAPIRepository) {}
  Execute(query: OpenAPIQueryDTO): Promise<OpenAPIResultDTO> {
    return this.repository.getSpec(query);
  }
}
