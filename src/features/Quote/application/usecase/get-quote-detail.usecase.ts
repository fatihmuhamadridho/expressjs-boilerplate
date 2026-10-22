import type { QuoteQueryDTO, QuoteResultDTO } from '../dto/quote.dto';
import type { QuoteRepository } from '../../domain/repository/quote.repository';

export interface GetQuoteDetailUseCaseInterface {
  Execute(id: string, query: QuoteQueryDTO): Promise<QuoteResultDTO>;
}

export class GetQuoteDetailUseCase implements GetQuoteDetailUseCaseInterface {
  constructor(private readonly repository: QuoteRepository) {}

  Execute(id: string, query: QuoteQueryDTO): Promise<QuoteResultDTO> {
    return this.repository.getById(id, query);
  }
}
