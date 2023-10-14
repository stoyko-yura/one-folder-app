import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '@/config';
import { errorHandler } from '@/middleware';

// CheckAuth middleware
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  try {
    // Decode token
    const decoded = jwt.verify(token, config.SECRET_JWT, (err, data) => {
      if (err) {
        throw new Error('Invalid token');
      }

      return data;
    });

    // Save decoded user id to request
    req.body = decoded;

    next();
  } catch (error) {
    errorHandler(error as Error, res);
  }
};
