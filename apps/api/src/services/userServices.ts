import type { Prisma, User } from '@one-folder-app/database';

import { dbClient } from '@/config';

export const findUserById = async (id: string): Promise<User | null> => {
  const user = await dbClient.user.findUnique({
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

export const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  const user = await dbClient.user.create({
    data
  });

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
