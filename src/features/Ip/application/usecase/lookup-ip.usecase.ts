import type { IpQueryDTO, IpResultDTO } from '../dto/ip.dto';
import type { IpRepository } from '../../domain/repository/ip.repository';

export interface LookupIpUseCaseInterface {
  Execute(query: IpQueryDTO): Promise<IpResultDTO>;
}

export class LookupIpUseCase implements LookupIpUseCaseInterface {
  constructor(private readonly repository: IpRepository) {}
  Execute(query: IpQueryDTO): Promise<IpResultDTO> {
    return this.repository.lookup(query);
  }
}
