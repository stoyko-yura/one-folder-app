import type { HttpErrorResponse, HttpResponseErrorArgs, Statuses } from '@/types';
import { HttpStatusCode } from '@/types';

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

export const errorHandler = (error: HttpResponseError, res: HttpErrorResponse) => {
  const code = HttpStatusCode[error.status];

  const description = error.description ? `\n${error.description}` : '';

  console.log(`[${error.status}]: ${error.message} ${description}`);

  res.status(code).json({
    message: error.message,
    success: false
  });
};
