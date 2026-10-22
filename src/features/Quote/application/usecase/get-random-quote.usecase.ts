import type { QuoteQueryDTO, QuoteResultDTO } from '../dto/quote.dto';
import type { QuoteRepository } from '../../domain/repository/quote.repository';

export interface GetRandomQuoteUseCaseInterface {
  Execute(query: QuoteQueryDTO): Promise<QuoteResultDTO>;
}

export class GetRandomQuoteUseCase implements GetRandomQuoteUseCaseInterface {
  constructor(private readonly repository: QuoteRepository) {}

  Execute(query: QuoteQueryDTO): Promise<QuoteResultDTO> {
    return this.repository.getRandom(query);
  }
}
