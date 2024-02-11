import type { Response } from 'express';

import { HttpStatusCode, type HttpResponseErrorArgs, type Statuses } from '@/types';

export class HttpResponseError extends Error {
  public readonly status: Statuses;

  public readonly message: string;

  public readonly description?: string;

  constructor(args: HttpResponseErrorArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.status = args.status;
    this.message = args.message;
    this.description = args.description;

    Error.captureStackTrace(this);
  }
}

export const errorHandler = (error: HttpResponseError, res: Response) => {
  const code = HttpStatusCode[error.status];

  console.log(
    `[${error.status}]: ${error.message} ${error.description && `\n${error.description}`}`
  );

  res.status(code).json({
    message: error.message,
    success: false
  });
};