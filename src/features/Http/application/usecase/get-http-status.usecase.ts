import type { HttpQueryDTO, HttpResultDTO } from '../dto/http.dto';
import type { HttpRepository } from '../../domain/repository/http.repository';

export interface GetHttpStatusUseCaseInterface {
  Execute(httpCode: string, query: HttpQueryDTO): Promise<HttpResultDTO>;
}

export class GetHttpStatusUseCase implements GetHttpStatusUseCaseInterface {
  constructor(private readonly repository: HttpRepository) {}

  Execute(httpCode: string, query: HttpQueryDTO): Promise<HttpResultDTO> {
    return this.repository.getStatus(httpCode, query);
  }
}
