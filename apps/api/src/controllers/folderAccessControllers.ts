import type { Request, Response } from 'express';

import { dbEnums } from '@/config';
import { errorHandler } from '@/middleware';

// Get folder's accesses
export const getFolderAccesses = (req: Request, res: Response) => {
  try {
    const { accesses } = dbEnums;

    res.status(200).json({
      accesses,
      message: 'Accesses loaded',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};