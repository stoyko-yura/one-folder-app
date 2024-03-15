import type { UserData } from '@one-folder-app/types';
import type { Request } from 'express';

import { getPaginationLinks } from '@/middleware';
import { userServices } from '@/services';
import type {
  DeleteUserRequest,
  DeleteUserResponse,
  GetUserCommentsRequest,
  GetUserCommentsResponse,
  GetUserFoldersRequest,
  GetUserFoldersResponse,
  GetUserRequest,
  GetUserResponse,
  GetUsersRequest,
  GetUsersResponse,
  PutUserRequest,
  PutUserResponse
} from '@/types';
import { HttpResponseError, errorHandler, excludeFields } from '@/utils';

// Get users
export const getUsers = async (req: GetUsersRequest, res: GetUsersResponse) => {
  try {
    const { limit = 10, page = 1, pageIndex = 0, orderBy } = req.query;

    const users = await userServices.getUsersWithPagination({
      limit,
      orderBy,
      pageIndex
    });

    if (!users) {
      throw new HttpResponseError({
        message: 'Users not found',
        status: 'NOT_FOUND'
      });
    }

    const totalUsers = await userServices.getTotalUsers();
    const totalPages = Math.ceil(totalUsers / limit);

    const links = getPaginationLinks(req as Request, { limit, page, totalPages });

    res.status(200).json({
      links,
      message: 'Users loaded',
      success: true,
      totalPages,
      totalUsers,
      users: excludeFields(users, ['hash']) as UserData[]
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get user
export const getUser = async (req: GetUserRequest, res: GetUserResponse) => {
  try {
    const { userId } = req.params;

    const user = await userServices.getUserById(userId, { withInclude: true });

    if (!user) {
      throw new HttpResponseError({
        description: `User ${userId} not found`,
        message: 'User not found',
        status: 'NOT_FOUND'
      });
    }

    res.status(200).json({
      message: 'User loaded',
      success: true,
      user: excludeFields(user, ['hash']) as UserData
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get user's comments
export const getUserComments = async (
  req: GetUserCommentsRequest,
  res: GetUserCommentsResponse
) => {
  try {
    const { limit = 10, page = 1, pageIndex = 0, orderBy = { createdAt: 'asc' } } = req.query;
    const { userId } = req.params;

    if (!userId) {
      throw new HttpResponseError({
        description: 'userId is required. Please check your params',
        message: 'userId is required',
        status: 'FORBIDDEN'
      });
    }

    const user = await userServices.getUserById(userId);

    if (!user) {
      throw new HttpResponseError({
        description: `User ${userId} not found`,
        message: 'User not found',
        status: 'NOT_FOUND'
      });
    }

    const userComments = await userServices.getUserCommentsWithPagination(userId, {
      limit,
      orderBy,
      pageIndex
    });

    if (!userComments) {
      throw new HttpResponseError({
        message: "User's comments not found",
        status: 'NOT_FOUND'
      });
    }

    const totalUserComments = await userServices.getTotalUserComments(userId);
    const totalPages = Math.ceil(totalUserComments / limit);

    const links = getPaginationLinks(req as Request, { limit, page, totalPages });

    res.status(200).json({
      links,
      message: "User's comments loaded",
      success: true,
      totalPages,
      totalUserComments,
      userComments
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get user's folders
export const getUserFolders = async (req: GetUserFoldersRequest, res: GetUserFoldersResponse) => {
  try {
    const { limit = 10, page = 1, pageIndex = 0, orderBy = { createdAt: 'asc' } } = req.query;
    const { userId } = req.params;

    if (!userId) {
      throw new HttpResponseError({
        description: 'userId is required. Please check your params',
        message: 'userId is required',
        status: 'FORBIDDEN'
      });
    }

    const user = await userServices.getUserById(userId);

    if (!user) {
      throw new HttpResponseError({
        description: `User ${userId} not found`,
        message: 'User not found',
        status: 'NOT_FOUND'
      });
    }

    const userFolders = await userServices.getUserFoldersWithPagination(userId, {
      limit,
      orderBy,
      pageIndex
    });

    if (!userFolders) {
      throw new HttpResponseError({
        message: "User's folders not found",
        status: 'NOT_FOUND'
      });
    }

    const totalUserFolders = await userServices.getTotalUserFolders(userId);
    const totalPages = Math.ceil(totalUserFolders / limit);

    const links = getPaginationLinks(req as Request, { limit, page, totalPages });

    res.status(200).json({
      links,
      message: "User's folders loaded",
      success: true,
      totalPages,
      totalUserFolders,
      userFolders
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Put user
export const putUser = async (req: PutUserRequest, res: PutUserResponse) => {
  try {
    const { userId } = req.params;
    const { email, login, bio, username, role } = req.body;

    if (!userId) {
      throw new HttpResponseError({
        description: 'userId is required. Please check your params',
        message: 'userId is required',
        status: 'FORBIDDEN'
      });
    }

    const user = await userServices.getUserById(userId);

    if (!user) {
      throw new HttpResponseError({
        description: `User ${userId} not found`,
        message: 'User not found',
        status: 'NOT_FOUND'
      });
    }

    const editedUser = await userServices.putUser(userId, {
      bio,
      email,
      login,
      role,
      username
    });

    res.status(200).json({
      message: `User edited`,
      success: true,
      user: excludeFields(editedUser, ['hash']) as UserData
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Delete user
export const deleteUser = async (req: DeleteUserRequest, res: DeleteUserResponse) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      throw new HttpResponseError({
        description: 'userId is required. Please check your params',
        message: 'userId is required',
        status: 'FORBIDDEN'
      });
    }

    const user = await userServices.getUserById(userId);

    if (!user) {
      throw new HttpResponseError({
        description: `User ${userId} not found`,
        message: 'User not found',
        status: 'NOT_FOUND'
      });
    }

    await userServices.deleteUser(userId);

    res.status(200).json({
      message: 'User deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};
