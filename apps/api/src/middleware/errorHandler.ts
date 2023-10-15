import type { Response } from 'express';

export const errorHandler = (error: Error, res: Response, statusCode: number = 500) => {
  console.error(error);

  res.status(statusCode).json({
    message: error.message,
    success: false
  });
};
