import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { HttpResponseError, errorHandler } from '@/utils';

export const checkValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new HttpResponseError({
        message: 'Invalid validation',
        status: 'INTERNAL_SERVER_ERROR'
      });
    }

    next();
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};
