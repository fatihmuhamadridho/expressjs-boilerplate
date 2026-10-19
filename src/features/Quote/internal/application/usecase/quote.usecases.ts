import type { QuoteQueryDTO, QuoteResultDTO } from '../dto/quote.dto';
import type { QuoteRepository } from '../quote.interface';

export class QuoteUseCases {
  constructor(private readonly repository: QuoteRepository) {}
  getAll(query: QuoteQueryDTO): Promise<QuoteResultDTO> {
    return this.repository.getAll(query);
  }
  getById(id: string, query: QuoteQueryDTO): Promise<QuoteResultDTO> {
    return this.repository.getById(id, query);
  }
  getRandom(query: QuoteQueryDTO): Promise<QuoteResultDTO> {
    return this.repository.getRandom(query);
  }
  getRandomBatch(length: string, query: QuoteQueryDTO): Promise<QuoteResultDTO> {
    return this.repository.getRandomBatch(length, query);
  }
}
