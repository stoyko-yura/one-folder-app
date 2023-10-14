import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { config, dbClient } from '@/config';
import { errorHandler } from '@/middleware';
import { excludeFields } from '@/utils';

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
        success: false
      });
    }

    const { username, password } = req.body;

    const user = await dbClient.user.findUnique({
      where: {
        username
      }
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.hash);

    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Invalid username or password',
        sucess: false
      });
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

// Register
export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
        success: false
      });
    }

    const { username, email, password, role } = req.body;

    const user = await dbClient.user.findFirst({
      where: {
        OR: [
          {
            email: { equals: email }
          },
          {
            username: { equals: username }
          }
        ]
      }
    });

    if (user) {
      throw new Error('Username or email already exist');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const createdUser = await dbClient.user.create({
      data: {
        email,
        hash: passwordHash,
        role,
        username
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

export const getMe = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const user = await dbClient.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(404).json({
        message: 'Something went wrong',
        success: false
      });
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
