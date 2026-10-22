import type { OpenAPIQueryDTO, OpenAPIResultDTO } from '../dto/openapi.dto';
import type { OpenAPIRepository } from '../../domain/repository/openapi.repository';

export interface GetOpenAPISpecUseCaseInterface {
  Execute(query: OpenAPIQueryDTO): Promise<OpenAPIResultDTO>;
}

export class GetOpenAPISpecUseCase implements GetOpenAPISpecUseCaseInterface {
  constructor(private readonly repository: OpenAPIRepository) {}
  Execute(query: OpenAPIQueryDTO): Promise<OpenAPIResultDTO> {
    return this.repository.getSpec(query);
  }
}
