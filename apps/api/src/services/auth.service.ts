import type { User } from '@one-folder-app/database';
import bcrypt from 'bcrypt';
import type { JwtPayload, SignOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import { config, dbClient } from '@/config';

export const changeUserPassword = async (id: string, password: string): Promise<User> => {
  const user = await dbClient.user.update({
    data: {
      hash: password
    },
    where: {
      id
    }
  });

  return user;
};

export const comparePassword = (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash);

export const generateToken = (payload: JwtPayload, options?: SignOptions): string =>
  jwt.sign(payload, config.SECRET_JWT, options);

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};
