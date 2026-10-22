import type { HttpQueryDTO, HttpResultDTO } from '../dto/http.dto';
import type { HttpRepository } from '../../domain/repository/http.repository';

export interface GetHttpStatusMessageUseCaseInterface {
  Execute(httpCode: string, message: string, query: HttpQueryDTO): Promise<HttpResultDTO>;
}

export class GetHttpStatusMessageUseCase implements GetHttpStatusMessageUseCaseInterface {
  constructor(private readonly repository: HttpRepository) {}

  Execute(httpCode: string, message: string, query: HttpQueryDTO): Promise<HttpResultDTO> {
    return this.repository.getStatusMessage(httpCode, message, query);
  }
}
