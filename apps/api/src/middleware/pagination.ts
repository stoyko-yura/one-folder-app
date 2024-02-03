import type { NextFunction, Request, Response } from 'express';

import { errorHandler } from './errorHandler';

export const pagination = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit } = req.query;

    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 10;

    const pageIndex = parsedPage - 1;

    if (parsedPage < 0) {
      return errorHandler(new Error('Page must be at least 1'), res);
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

export const getPaginationLinks = (
  req: Request,
  options: { limit: number; page: number; totalPages: number }
) => {
  const { limit, page, totalPages } = options;

  const baseUrl = `${req.protocol}://${req.headers.host}${req.baseUrl}`;

  return {
    next: page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null,
    previus: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null
  };
};
