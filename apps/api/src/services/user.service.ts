import type { Comment, Folder, User } from '@one-folder-app/database';
import type {
  GetUserCommentsPaginationParams,
  GetUserFoldersPaginationParams,
  GetUsersPaginationParams,
  PutUserRequestBody,
  SignUpRequestBody
} from '@one-folder-app/types';

import { dbClient } from '@/config';

export const getUserById = async (
  id: string,
  options: { withInclude: boolean } = { withInclude: false }
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

export const getUserByLogin = async (login: string): Promise<User | null> => {
  const user = await dbClient.user.findUnique({
    where: {
      login
    }
  });

  return user;
};

export const getUserByEmailOrLogin = async (params: {
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

export const getUsersWithPagination = async (
  options: GetUsersPaginationParams
): Promise<User[] | null> => {
  const { limit = 10, pageIndex = 0, orderBy = { createdAt: 'asc' } } = options;

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
    skip: Number(pageIndex) * Number(limit),
    take: Number(limit)
  });

  if (!users.length) return null;

  return users;
};

export const getUserCommentsWithPagination = async (
  userId: string,
  options: GetUserCommentsPaginationParams
): Promise<Comment[] | null> => {
  const { limit = 10, pageIndex = 0, orderBy = { createdAt: 'asc' } } = options;

  const userComments = await dbClient.comment.findMany({
    orderBy,
    skip: Number(pageIndex) * Number(limit),
    take: Number(limit),
    where: {
      authorId: userId
    }
  });

  if (!userComments.length) return null;

  return userComments;
};

export const getUserFoldersWithPagination = async (
  userId: string,
  options: GetUserFoldersPaginationParams
): Promise<Folder[] | null> => {
  const { limit = 10, pageIndex = 0, orderBy = { createdAt: 'asc' } } = options;

  const userFolders = await dbClient.folder.findMany({
    orderBy,
    skip: Number(pageIndex) * Number(limit),
    take: Number(limit),
    where: {
      authorId: userId
    }
  });

  if (!userFolders.length) return null;

  return userFolders;
};

export const postUser = (data: SignUpRequestBody): Promise<User> => {
  const { bio, email, login, password, username } = data;

  const user = dbClient.user.create({
    data: {
      email,
      hash: password,
      login,
      profile: {
        create: {
          bio,
          username
        }
      }
    }
  });

  return user;
};

export const putUser = async (id: string, data: PutUserRequestBody): Promise<User> => {
  const { email, login, bio, role, username } = data;

  const user = await dbClient.user.update({
    data: {
      email,
      login,
      profile: {
        update: {
          bio: bio || null,
          username: username || null
        }
      },
      role
    },
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
