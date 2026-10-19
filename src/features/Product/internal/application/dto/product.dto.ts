import type { DummyJsonResponse } from '../../../../../common/dummyjson/application/dummyjson.interface';
import type { ProductCommand, ProductQuery } from '../../../domain/repository/product.repository';

export type ProductQueryDTO = ProductQuery;
export type ProductCommandDTO = ProductCommand;
export type ProductResultDTO = DummyJsonResponse;
