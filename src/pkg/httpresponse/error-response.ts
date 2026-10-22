import { ResourceGatewayError } from '../errs/upstream.error';
import type { ErrorRequestHandler, RequestHandler } from 'express';
import { InvalidInputError } from '../errs/invalid-input.error';

export const notFoundHandler: RequestHandler = (_request, response) => {
  response
    .status(404)
    .json({ status: 'fail', error: { code: 'NOT_FOUND', message: 'Resource not found' }, data: null });
};

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }
  let statusCode = 500;
  let code = 'INTERNAL_ERROR';
  let message = 'Unable to complete request';
  if (error instanceof InvalidInputError) {
    statusCode = 400;
    code = 'INVALID_INPUT';
    message = error.message;
  } else if (error instanceof ResourceGatewayError) {
    statusCode = error.kind === 'timeout' ? 504 : 502;
    code = error.kind === 'timeout' ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM_UNAVAILABLE';
    message = error.kind === 'timeout' ? 'Request timed out' : 'Service temporarily unavailable';
  } else if (typeof error === 'object' && error !== null && 'type' in error) {
    if (error.type === 'entity.too.large') {
      statusCode = 413;
      code = 'PAYLOAD_TOO_LARGE';
      message = 'Request body is too large';
    } else if (error.type === 'entity.parse.failed') {
      statusCode = 400;
      code = 'INVALID_INPUT';
      message = 'Request body is invalid';
    }
  }
  if (statusCode >= 500) console.error(error);
  response
    .status(statusCode)
    .json({ status: statusCode >= 500 ? 'error' : 'fail', error: { code, message }, data: null });
};
