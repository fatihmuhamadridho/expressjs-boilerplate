import type { QuoteQueryDTO, QuoteResultDTO } from '../dto/quote.dto';
import type { QuoteRepository } from '../../domain/repository/quote.repository';

export interface GetQuoteListUseCaseInterface {
  Execute(query: QuoteQueryDTO): Promise<QuoteResultDTO>;
}

export class GetQuoteListUseCase implements GetQuoteListUseCaseInterface {
  constructor(private readonly repository: QuoteRepository) {}

  Execute(query: QuoteQueryDTO): Promise<QuoteResultDTO> {
    return this.repository.getAll(query);
  }
}
