import type { NextFunction, Request, Response } from 'express';

import { errorHandler } from './errorHandler';

export const pagination = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit } = req.query;

    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 10;

    const pageIndex = parsedPage - 1;

    if (parsedPage < 0) {
      throw new Error('Page must be at least 1');
    }

    req.query = {
      limit: parsedLimit.toString(),
      page: parsedPage.toString(),
      pageIndex: pageIndex.toString()
    };

    next();
  } catch (error) {
    errorHandler(error as Error, res);
  }
};
