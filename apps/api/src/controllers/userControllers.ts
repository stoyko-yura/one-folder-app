import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { errorHandler, getPaginationLinks } from '@/middleware';
import { userServices } from '@/services';
import { excludeFields } from '@/utils';

// Get users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;

    const users = await userServices.findUsersWithPagination({
      limit: Number(limit),
      orderBy: {
        createdAt: 'asc'
      },
      pageIndex: Number(pageIndex)
    });

    if (!users) {
      return errorHandler(new Error('Users not found'), res, 404);
    }

    const totalUsers = await userServices.getTotalUsers();
    const totalPages = Math.ceil(totalUsers / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

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

    const user = await userServices.findUserById(userId, { withInclude: true });

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

// Get user's comments
export const getUserComments = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { userId } = req.params;

    const user = await userServices.findUserById(userId);

    if (!user) {
      return errorHandler(new Error(`User ${userId}`), res, 404);
    }

    const userComments = await userServices.findUserCommentsWithPagination(userId, {
      limit: Number(limit),
      orderBy: {
        createdAt: 'asc'
      },
      pageIndex: Number(pageIndex)
    });

    if (!userComments) {
      return errorHandler(new Error(`User's comments not found`), res, 404);
    }

    const totalUserComments = await userServices.getTotalUserComments(userId);
    const totalPages = Math.ceil(totalUserComments / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

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

// Get user's folders
export const getUserFolders = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { userId } = req.params;

    const user = await userServices.findUserById(userId);

    if (!user) {
      return errorHandler(new Error(`User ${userId}`), res, 404);
    }

    const userFolders = await userServices.findUserFoldersWithPagination(userId, {
      limit: Number(limit),
      orderBy: {
        createdAt: 'asc'
      },
      pageIndex: Number(pageIndex)
    });

    if (!userFolders) {
      return errorHandler(new Error(`User's folders not found`), res, 404);
    }

    const totalUserFolders = await userServices.getTotalUserFolders(userId);
    const totalPages = Math.ceil(totalUserFolders / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

    res.status(200).json({
      links,
      message: "User's folders loaded",
      success: true,
      totalPages,
      totalUserFolders,
      userFolders
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Put user
export const putUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
        success: false
      });
    }

    const { userId } = req.params;
    const { email, login, bio, username, role } = req.body;

    const user = await userServices.findUserById(userId);

    if (!user) {
      return errorHandler(new Error(`User ${userId} not found`), res, 404);
    }

    const editedUser = await userServices.updateUser(userId, {
      email,
      login,
      profile: {
        update: {
          bio: bio || null,
          username: username || null
        }
      },
      role
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

    const user = await userServices.findUserById(userId);

    if (!user) {
      return errorHandler(new Error(`User ${userId} not found`), res, 404);
    }

    await userServices.deleteUser(userId);

    res.status(200).json({
      message: 'User deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};
