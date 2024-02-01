import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { errorHandler } from '@/middleware';
import { authServices, userServices } from '@/services';
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

    const user = await userServices.findUserByLogin(login);

    if (!user) {
      return errorHandler(new Error('User not found'), res, 404);
    }

    const isValidPassword = await authServices.comparePassword(password, user.hash);

    if (!isValidPassword) {
      return errorHandler(new Error('Invalid username or password'), res, 400);
    }

    const token = authServices.generateToken({ userId: user.id }, { expiresIn: '7d' });

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

    const user = await userServices.findUserByEmailOrLogin({
      email,
      login
    });

    if (user) {
      return errorHandler(Error('Login or email already exist'), res);
    }

    const passwordHash = await authServices.hashPassword(password);

    const createdUser = await userServices.createUser({
      email,
      hash: passwordHash,
      login,
      profile: {
        create: {
          bio,
          username
        }
      }
    });

    const token = authServices.generateToken({ userId: createdUser.id }, { expiresIn: '7d' });

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

    const user = await userServices.findUserById(userId);

    if (!user) {
      return errorHandler(new Error('Something went wrong'), res);
    }

    const token = authServices.generateToken({ userId: user.id }, { expiresIn: '7d' });

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

    const user = await userServices.findUserById(userId);

    if (!user) {
      return errorHandler(new Error(`User ${userId} not found`), res, 404);
    }

    const isValidPassword = await authServices.comparePassword(password, user.hash);

    if (!isValidPassword) {
      return errorHandler(new Error('Invalid password'), res, 400);
    }

    if (isValidPassword && password === newPassword) {
      return errorHandler(
        new Error('New password must not be similar to the previous password'),
        res
      );
    }

    const passwordHash = await authServices.hashPassword(password);

    const editedUser = await userServices.updateUser(userId, {
      hash: passwordHash
    });

    const token = authServices.generateToken({ userId: user.id }, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Password successfully changed',
      success: true,
      token,
      user: excludeFields(editedUser, ['hash'])
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};
