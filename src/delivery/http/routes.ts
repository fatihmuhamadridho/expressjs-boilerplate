import type { RequestHandler } from 'express';
import type { ResourceMethod } from '../../pkg/httpclient/http-client';

export interface Resource {
  readonly name: string;
  readonly methods: readonly ResourceMethod[];
  readonly mountPaths: readonly string[];
  readonly routes: RequestHandler;
}
