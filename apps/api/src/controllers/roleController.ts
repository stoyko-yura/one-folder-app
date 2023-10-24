import { Role } from '@one-folder-app/database';
import type { Request, Response } from 'express';

import { errorHandler } from '@/middleware';

// Get roles
export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = Object.values(Role);

    res.status(200).json({
      message: 'Roles loaded',
      success: true,
      roles
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};
