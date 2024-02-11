import type { Request, Response } from 'express';

import { dbEnums } from '@/config';
import type { HttpResponseError } from '@/middleware';
import { errorHandler } from '@/middleware';

// Get roles
export const getRoles = (req: Request, res: Response) => {
  try {
    const { roles } = dbEnums;

    res.status(200).json({
      message: 'Roles loaded',
      roles,
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};
