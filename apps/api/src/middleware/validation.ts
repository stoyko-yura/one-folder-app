import type { ValidationChain } from 'express-validator';
import { body } from 'express-validator';

// Auth validation
export const loginValidation: ValidationChain[] = [
  body('username').notEmpty().withMessage('Enter username'),
  body('password').notEmpty().withMessage('Enter password')
];

export const registerValidation: ValidationChain[] = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ max: 24, min: 4 })
    .withMessage('Username must contain from 4 to 24 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Wrong email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword({
      minLength: 7,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 1
    })
    .withMessage('Wrong password format')
];

export const changePasswordValidation: ValidationChain[] = [
  body('password').notEmpty().withMessage('Password is required'),
  body('newPassword')
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword({
      minLength: 7,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 1
    })
    .withMessage('Wrong password format')
];
