import bcrypt from 'bcrypt';
import type { JwtPayload, SignOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import { config } from '@/config';

export const comparePassword = (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash);

export const generateToken = (payload: JwtPayload, options?: SignOptions): string =>
  jwt.sign(payload, config.SECRET_JWT, options);

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};
