import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { config, dbClient } from '@/config';
import { errorHandler } from '@/middleware';
import { excludeFields } from '@/utils';

// Sign in
export const signIn = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
        success: false
      });
    }

    const { login, password } = req.body;

    const user = await dbClient.user.findUnique({
      where: {
        login
      }
    });

    if (!user) {
      return errorHandler(new Error('User not found'), res, 404);
    }

    const isValidPassword = await bcrypt.compare(password, user.hash);

    if (!isValidPassword) {
      return errorHandler(new Error('Invalid username or password'), res, 400);
    }

    const token = jwt.sign(
      {
        userId: user.id
      },
      config.SECRET_JWT,
      {
        expiresIn: '7d'
      }
    );

    res.status(200).json({
      message: 'Authorization successful',
      success: true,
      token,
      user: excludeFields(user, ['hash'])
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Sign up
export const signUp = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
        success: false
      });
    }

    const { email, login, bio, username, password } = req.body;

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

    if (user) {
      return errorHandler(Error('Username or email already exist'), res);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const createdUser = await dbClient.user.create({
      data: {
        email,
        hash: passwordHash,
        login,
        profile: {
          create: {
            bio,
            username
          }
        }
      }
    });

    const token = jwt.sign(
      {
        userId: createdUser.id
      },
      config.SECRET_JWT,
      {
        expiresIn: '7d'
      }
    );

    res.status(200).json({
      message: 'Registration successful',
      success: true,
      token,
      user: excludeFields(createdUser, ['hash'])
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Get me
export const getMe = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const user = await dbClient.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return errorHandler(new Error('Something went wrong'), res);
    }

    const token = jwt.sign(
      {
        userId: user.id
      },
      config.SECRET_JWT,
      {
        expiresIn: '7d'
      }
    );

    res.status(200).json({
      message: 'Authorization successful',
      sucess: true,
      token,
      user: excludeFields(user, ['hash'])
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Change password
export const changePassword = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
        success: false
      });
    }

    const { userId, password, newPassword } = req.body;

    const user = await dbClient.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return errorHandler(new Error(`User ${userId} not found`), res, 404);
    }

    const isValidPassword = await bcrypt.compare(password, user.hash);

    if (!isValidPassword) {
      return errorHandler(new Error('Invalid password'), res, 400);
    }

    if (isValidPassword && password === newPassword) {
      return errorHandler(
        new Error('New password must not be similar to the previous password'),
        res
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    const editedUser = await dbClient.user.update({
      data: {
        hash: passwordHash
      },
      where: {
        id: userId
      }
    });

    const token = jwt.sign(
      {
        userId: user.id
      },
      config.SECRET_JWT,
      {
        expiresIn: '7d'
      }
    );

    res.status(200).json({
      message: 'Password successfully changed',
      success: true,
      token,
      user: editedUser
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};
