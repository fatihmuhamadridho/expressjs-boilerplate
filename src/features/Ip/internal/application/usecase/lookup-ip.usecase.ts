import type { IpQueryDTO, IpResultDTO } from '../dto/ip.dto';
import type { IpRepository } from '../ip.interface';

export class LookupIpUseCase {
  constructor(private readonly repository: IpRepository) {}
  Execute(query: IpQueryDTO): Promise<IpResultDTO> {
    return this.repository.lookup(query);
  }
}
