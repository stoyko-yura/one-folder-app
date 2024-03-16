import type { BaseErrorResponseBody } from '@one-folder-app/types';
import type { Response } from 'express';

export type Statuses =
  | 'OK'
  | 'NO_CONTENT'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'INTERNAL_SERVER_ERROR';

// eslint-disable-next-line no-shadow
export enum HttpStatusCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export interface HttpResponseErrorArgs {
  status: Statuses;
  message: string;
  description?: string;
}

export type HttpErrorResponse = Response<BaseErrorResponseBody>;
