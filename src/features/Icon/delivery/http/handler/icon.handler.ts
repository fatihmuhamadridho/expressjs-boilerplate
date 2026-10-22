import type { RequestHandler } from 'express';
import { GetDefaultIconHandler } from './get-default-icon.handler';
import { GetIconByHashHandler } from './get-icon-by-hash.handler';
import { GetIconByHashAndSizeHandler } from './get-icon-by-hash-and-size.handler';
import type {
  GetDefaultIconUseCaseInterface,
  GetIconByHashUseCaseInterface,
  GetIconByHashAndSizeUseCaseInterface,
} from '../../../application/usecase/icon.usecases';
import type { IconMapper } from '../mapper/icon.mapper';

export interface IconUseCases {
  getDefault: GetDefaultIconUseCaseInterface;
  getByHash: GetIconByHashUseCaseInterface;
  getByHashAndSize: GetIconByHashAndSizeUseCaseInterface;
}

export class IconHandler {
  readonly getDefault: RequestHandler;
  readonly getByHash: RequestHandler;
  readonly getByHashAndSize: RequestHandler;

  constructor(useCases: IconUseCases, mapper: IconMapper) {
    this.getDefault = new GetDefaultIconHandler(useCases.getDefault, mapper).Handle;
    this.getByHash = new GetIconByHashHandler(useCases.getByHash, mapper).Handle;
    this.getByHashAndSize = new GetIconByHashAndSizeHandler(useCases.getByHashAndSize, mapper).Handle;
  }
}
