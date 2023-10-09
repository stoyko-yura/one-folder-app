import type { Response } from 'express';

export const errorHandler = (error: Error, res: Response) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message
  });
};
