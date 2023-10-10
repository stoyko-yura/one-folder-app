import type { Request, Response } from 'express';

import { dbClient } from '@/config';
import { errorHandler } from '@/middleware';
import { excludeFields } from '@/utils';

// Get users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;

    const users = await dbClient.user.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10
    });

    if (!users.length) {
      return res.status(404).json({
        message: 'Users not found',
        success: false
      });
    }

    const totalUsers = await dbClient.user.count();
    const totalPages = Math.ceil(totalUsers / Number(limit));

    const links = {
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/users?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null,
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/users?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      message: 'Users loaded',
      success: true,
      totalPages,
      totalUsers,
      links,
      users: excludeFields(users, ['hash'])
    });
  } catch (error) {
    return errorHandler(error as Error, res);
  }
};

// Get user
export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await dbClient.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        message: `User ${userId} not found`,
        success: false
      });
    }

    res.status(200).json({
      message: 'User loaded',
      success: true,
      user: excludeFields(user, ['hash'])
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Put user
export const putUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { username, role, email } = req.body;

    const user = await dbClient.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        message: `User ${userId} not found`,
        success: false
      });
    }

    const editedUser = await dbClient.user.update({
      data: {
        email,
        role,
        username
      },
      where: { id: userId }
    });

    res.status(200).json({
      message: `User edited`,
      success: true,
      user: excludeFields(editedUser, ['hash'])
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await dbClient.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        message: `User ${userId} not found`,
        success: false
      });
    }

    await dbClient.user.delete({ where: { id: userId } });

    res.status(200).json({
      message: 'User deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};
