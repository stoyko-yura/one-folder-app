import type { ValidationChain } from 'express-validator';
import { body } from 'express-validator';

import { dbEnums } from '@/config';

// Auth validation
export const signInValidation: ValidationChain[] = [
  body('login').not().notEmpty().withMessage('Login is required').toLowerCase(),
  body('password').not().notEmpty().withMessage('Login is required')
];

export const signUpValidation: ValidationChain[] = [
  body('login')
    .not()
    .notEmpty()
    .withMessage('Login is required')
    .isLength({ max: 24, min: 4 })
    .withMessage('Login must contain from 4 to 24 characters')
    .toLowerCase(),
  body('email')
    .not()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Wrong email format')
    .toLowerCase(),
  body('password')
    .not()
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword({
      minLength: 7,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 1
    })
    .withMessage('Wrong password format'),
  body('role')
    .default('USER')
    .toUpperCase()
    .isIn(dbEnums.roles)
    .withMessage(`Role can be only ${dbEnums.roles.join(', ')}`)
];

export const changePasswordValidation: ValidationChain[] = [
  body('password').not().notEmpty().withMessage('Password is required'),
  body('newPassword')
    .not()
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

export const passwordRecoveryValidation: ValidationChain[] = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Wrong email format')
];
