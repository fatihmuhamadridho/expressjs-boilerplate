import type { RequestHandler } from 'express';
import { GenerateCustomResponseHandler } from './generate-custom-response.handler';
import { GetCustomResponseByIdentifierHandler } from './get-custom-response-by-identifier.handler';
import type {
  GenerateCustomResponseUseCaseInterface,
  GetCustomResponseByIdentifierUseCaseInterface,
} from '../../../application/usecase/custom-response.usecases';
import type { CustomResponseMapper } from '../mapper/custom-response.mapper';

export interface CustomResponseUseCases {
  generate: GenerateCustomResponseUseCaseInterface;
  getByIdentifier: GetCustomResponseByIdentifierUseCaseInterface;
}

export class CustomResponseHandler {
  readonly generate: RequestHandler;
  readonly getByIdentifier: RequestHandler;

  constructor(useCases: CustomResponseUseCases, mapper: CustomResponseMapper) {
    this.generate = new GenerateCustomResponseHandler(useCases.generate, mapper).Handle;
    this.getByIdentifier = new GetCustomResponseByIdentifierHandler(useCases.getByIdentifier, mapper).Handle;
  }
}
