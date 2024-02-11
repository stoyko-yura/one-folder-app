import type { Comment, Folder, Prisma, User } from '@one-folder-app/database';

import { dbClient } from '@/config';
import type { PaginationOptions } from '@/types';

export const findUserById = async (
  id: string,
  options: { withInclude?: boolean } = { withInclude: false }
): Promise<User | null> => {
  const { withInclude } = options;

  const includeData = withInclude
    ? {
        _count: {
          select: {
            comments: true,
            folders: true
          }
        },
        profile: true
      }
    : undefined;

  const user = await dbClient.user.findUnique({
    include: includeData,
    where: {
      id
    }
  });

  return user;
};

export const findUserByLogin = async (login: string): Promise<User | null> => {
  const user = await dbClient.user.findUnique({
    where: {
      login
    }
  });

  return user;
};

export const findUserByEmailOrLogin = async (params: {
  email?: string;
  login?: string;
}): Promise<User | null> => {
  const { email, login } = params;

  const user = await dbClient.user.findFirst({
    where: {
      OR: [
        {
          email: { equals: email }
        },
        {
          login: { equals: login }
        }
      ]
    }
  });

  return user;
};

export const findUsersWithPagination = async (
  options: PaginationOptions<Prisma.UserOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      createdAt: 'asc'
    },
    pageIndex: 0
  }
): Promise<User[] | null> => {
  const { limit, orderBy, pageIndex } = options;

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
    orderBy,
    skip: pageIndex * limit,
    take: limit
  });

  if (!users.length) return null;

  return users;
};

export const findUserCommentsWithPagination = async (
  userId: string,
  options: PaginationOptions<Prisma.CommentOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      createdAt: 'asc'
    },
    pageIndex: 0
  }
): Promise<Comment[] | null> => {
  const { limit, orderBy, pageIndex } = options;

  const userComments = await dbClient.comment.findMany({
    orderBy,
    skip: pageIndex * limit,
    take: limit,
    where: {
      authorId: userId
    }
  });

  if (!userComments.length) return null;

  return userComments;
};

export const findUserFoldersWithPagination = async (
  userId: string,
  options: PaginationOptions<Prisma.FolderOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      createdAt: 'asc'
    },
    pageIndex: 0
  }
): Promise<Folder[] | null> => {
  const { limit, orderBy, pageIndex } = options;

  const userFolders = await dbClient.folder.findMany({
    orderBy,
    skip: pageIndex * limit,
    take: limit,
    where: {
      authorId: userId
    }
  });

  if (!userFolders.length) return null;

  return userFolders;
};

export const createUser = (data: Prisma.UserCreateInput): Promise<User> => {
  const user = dbClient.user.create({ data });

  return user;
};

export const updateUser = async (id: string, data: Prisma.UserUpdateInput): Promise<User> => {
  const user = await dbClient.user.update({
    data,
    where: {
      id
    }
  });

  return user;
};

export const deleteUser = async (id: string): Promise<void> => {
  await dbClient.user.delete({
    where: {
      id
    }
  });
};

export const getTotalUsers = async (): Promise<number> => dbClient.user.count();

export const getTotalUserComments = async (id: string): Promise<number> =>
  dbClient.comment.count({ where: { authorId: id } });

export const getTotalUserFolders = async (id: string): Promise<number> =>
  dbClient.folder.count({ where: { authorId: id } });
