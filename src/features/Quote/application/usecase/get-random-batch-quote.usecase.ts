import type { QuoteQueryDTO, QuoteResultDTO } from '../dto/quote.dto';
import type { QuoteRepository } from '../../domain/repository/quote.repository';

export interface GetRandomBatchQuoteUseCaseInterface {
  Execute(length: string, query: QuoteQueryDTO): Promise<QuoteResultDTO>;
}

export class GetRandomBatchQuoteUseCase implements GetRandomBatchQuoteUseCaseInterface {
  constructor(private readonly repository: QuoteRepository) {}

  Execute(length: string, query: QuoteQueryDTO): Promise<QuoteResultDTO> {
    return this.repository.getRandomBatch(length, query);
  }
}
