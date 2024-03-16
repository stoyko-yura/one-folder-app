import type { UserData } from '@one-folder-app/types';
import type { Response } from 'express';

import { authServices, userServices } from '@/services';
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  GetMeRequest,
  GetMeResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse
} from '@/types';
import { HttpResponseError, errorHandler, excludeFields } from '@/utils';

// Sign in
export const signIn = async (req: SignInRequest, res: SignInResponse) => {
  try {
    const { login, password } = req.body;

    const user = await userServices.getUserByLogin(login);

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
      user: excludeFields(user, ['hash']) as UserData
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res as Response as Response);
  }
};

// Sign up
export const signUp = async (req: SignUpRequest, res: SignUpResponse) => {
  try {
    const { email, login, bio, username, password } = req.body;

    const user = await userServices.getUserByEmailOrLogin({
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

    const createdUser = await userServices.postUser({
      bio,
      email,
      login,
      password: passwordHash,
      username
    });

    const token = authServices.generateToken({ userId: createdUser.id }, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Registration successful',
      success: true,
      token,
      user: excludeFields(createdUser, ['hash']) as UserData
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res as Response);
  }
};

// Get me
export const getMe = async (req: GetMeRequest, res: GetMeResponse) => {
  try {
    const { userId } = req.body;

    const user = await userServices.getUserById(userId);

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
      success: true,
      token,
      user: excludeFields(user, ['hash']) as UserData
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res as Response);
  }
};

// Change password
export const changePassword = async (req: ChangePasswordRequest, res: ChangePasswordResponse) => {
  try {
    const { userId, password, newPassword } = req.body;

    const user = await userServices.getUserById(userId);

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

    const editedUser = await authServices.changeUserPassword(userId, passwordHash);

    const token = authServices.generateToken({ userId: user.id }, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Password successfully changed',
      success: true,
      token,
      user: excludeFields(editedUser, ['hash']) as UserData
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res as Response);
  }
};
