import type { ResourceResult } from '../../../../pkg/httpclient/http-client';
import type { ProductCommand, ProductQuery } from '../../domain/repository/product.repository';

export type ProductQueryDTO = ProductQuery;
export type ProductCommandDTO = ProductCommand;
export type ProductResultDTO = ResourceResult;
