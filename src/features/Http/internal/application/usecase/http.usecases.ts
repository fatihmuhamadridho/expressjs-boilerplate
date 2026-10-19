import type { HttpQueryDTO, HttpResultDTO } from '../dto/http.dto';
import type { HttpRepository } from '../http.interface';

export class HttpUseCases {
  constructor(private readonly repository: HttpRepository) {}
  getStatus(httpCode: string, query: HttpQueryDTO): Promise<HttpResultDTO> {
    return this.repository.getStatus(httpCode, query);
  }
  getStatusMessage(httpCode: string, message: string, query: HttpQueryDTO): Promise<HttpResultDTO> {
    return this.repository.getStatusMessage(httpCode, message, query);
  }
}
