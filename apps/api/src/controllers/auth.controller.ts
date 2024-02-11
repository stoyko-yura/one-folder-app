import type { Request, Response } from 'express';

import { authServices, userServices } from '@/services';
import { HttpResponseError, errorHandler, excludeFields } from '@/utils';

// Sign in
export const signIn = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const user = await userServices.findUserByLogin(login);

    if (!user) {
      throw new HttpResponseError({
        description: `User with ${login} not found`,
        message: `User not found`,
        status: 'NOT_FOUND'
      });
    }

    const isValidPassword = await authServices.comparePassword(password, user.hash);

    if (!isValidPassword) {
      throw new HttpResponseError({
        description: 'Invalid username or password',
        message: 'Invalid username or password',
        status: 'BAD_REQUEST'
      });
    }

    const token = authServices.generateToken({ userId: user.id }, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Authorization successful',
      success: true,
      token,
      user: excludeFields(user, ['hash'])
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Sign up
export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, login, bio, username, password } = req.body;

    const user = await userServices.findUserByEmailOrLogin({
      email,
      login
    });

    if (user) {
      throw new HttpResponseError({
        description: `User with ${login} or ${email} already exist`,
        message: 'User already exist',
        status: 'BAD_REQUEST'
      });
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
    errorHandler(error as HttpResponseError, res);
  }
};

// Get me
export const getMe = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const user = await userServices.findUserById(userId);

    if (!user) {
      throw new HttpResponseError({
        description: `User ${userId} not found`,
        message: `User not found`,
        status: 'NOT_FOUND'
      });
    }

    const token = authServices.generateToken({ userId: user.id }, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Authorization successful',
      sucess: true,
      token,
      user: excludeFields(user, ['hash'])
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Change password
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { userId, password, newPassword } = req.body;

    const user = await userServices.findUserById(userId);

    if (!user) {
      throw new HttpResponseError({
        description: `User ${userId} not found`,
        message: `User not found`,
        status: 'NOT_FOUND'
      });
    }

    const isValidPassword = await authServices.comparePassword(password, user.hash);

    if (!isValidPassword) {
      throw new HttpResponseError({
        description: 'Invalid password',
        message: 'Invalid password',
        status: 'BAD_REQUEST'
      });
    }

    if (isValidPassword && password === newPassword) {
      throw new HttpResponseError({
        description: 'New password cannot be the same as old password',
        message: 'New password cannot be the same as old password',
        status: 'BAD_REQUEST'
      });
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
    errorHandler(error as HttpResponseError, res);
  }
};
