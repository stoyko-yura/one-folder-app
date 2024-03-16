export type EmptyObject = Record<string, unknown>;

export type BaseResponseBody = {
  message?: string;
  success?: boolean;
};

export interface BaseErrorResponseBody extends BaseResponseBody {}
