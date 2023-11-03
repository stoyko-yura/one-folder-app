import type { Request, Response } from 'express';

import { dbClient } from '@/config';
import { errorHandler } from '@/middleware';
import { excludeFields } from '@/utils';

// Get users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;

    const users = await dbClient.user.findMany({
      include: {
        _count: {
          select: {
            comments: true,
            folders: true
          }
        },
        profile: true
      },
      orderBy: {
        createdAt: 'asc'
      },
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10
    });

    if (!users.length) {
      return errorHandler(new Error('Users not found'), res, 404);
    }

    const totalUsers = await dbClient.user.count();
    const totalPages = Math.ceil(totalUsers / Number(limit));

    const links = {
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/users?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null,
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/users?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      links,
      message: 'Users loaded',
      success: true,
      totalPages,
      totalUsers,
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

    const user = await dbClient.user.findUnique({
      include: {
        _count: {
          select: {
            comments: true,
            folders: true
          }
        },
        profile: true
      },
      where: {
        id: userId
      }
    });

    if (!user) {
      return errorHandler(new Error(`User ${userId} not found`), res, 404);
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

// Get user comments
export const getUserComments = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { userId } = req.params;

    const user = await dbClient.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return errorHandler(new Error(`User ${userId}`), res, 404);
    }

    const userComments = await dbClient.comment.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10,
      where: {
        authorId: userId
      }
    });

    if (!userComments.length) {
      return errorHandler(new Error(`User's comments not found`), res, 404);
    }

    const totalUserComments = (
      await dbClient.comment.findMany({
        where: {
          authorId: userId
        }
      })
    ).length;
    const totalPages = Math.ceil(totalUserComments / Number(limit));

    const links = {
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/users/${userId}/comments?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null,
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/users/${userId}/comments?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      links,
      message: "User's comments loaded",
      success: true,
      totalPages,
      totalUserComments,
      userComments
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Get user folders
export const getUserFolders = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { userId } = req.params;

    const user = await dbClient.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return errorHandler(new Error(`User ${userId}`), res, 404);
    }

    const userFolders = await dbClient.folder.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10,
      where: {
        authorId: userId
      }
    });

    if (!userFolders.length) {
      return errorHandler(new Error(`User's folders not found`), res, 404);
    }

    const totalUserFolders = await dbClient.folder.findMany({
      where: {
        authorId: userId
      }
    });
    const totalPages = Math.ceil(totalUserFolders.length / Number(limit));

    const links = {
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/users/${userId}/folders?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null,
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/users/${userId}/folders?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      links,
      message: "User's folders loaded",
      success: true,
      totalPages,
      totalUserFolders: totalUserFolders.length,
      userFolders
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Put user
export const putUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { email, login, bio, username, role } = req.body;

    const user = await dbClient.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return errorHandler(new Error(`User ${userId} not found`), res, 404);
    }

    const editedUser = await dbClient.user.update({
      data: {
        email,
        login,
        profile: {
          update: {
            bio,
            username
          }
        },
        role
      },
      include: {
        _count: {
          select: {
            comments: true,
            folders: true
          }
        },
        profile: true
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
      return errorHandler(new Error(`User ${userId} not found`), res, 404);
    }

    await dbClient.user.delete({
      where: {
        id: userId
      }
    });

    res.status(200).json({
      message: 'User deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};
