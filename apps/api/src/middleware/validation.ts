import type { ValidationChain } from 'express-validator';
import { body } from 'express-validator';

// Auth validation
export const signInValidation: ValidationChain[] = [
  body('login').notEmpty().withMessage('Login is required'),
  body('password').notEmpty().withMessage('Login is required')
];

export const signUpValidation: ValidationChain[] = [
  body('login')
    .notEmpty()
    .withMessage('Login is required')
    .isLength({ max: 24, min: 4 })
    .withMessage('Login must contain from 4 to 24 characters'),
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

// User validation
export const editUserValidation: ValidationChain[] = [
  body('login')
    .notEmpty()
    .withMessage('Login is required')
    .isLength({ max: 24, min: 4 })
    .withMessage('Login must contain from 4 to 24 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Wrong email format')
];

// Categories validation
export const createCategoryValidation: ValidationChain[] = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 20, min: 1 })
    .withMessage('Name must contain from 1 to 20 characters')
];

export const editCategoryValidation: ValidationChain[] = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 20, min: 1 })
    .withMessage('Name must contain from 1 to 20 characters')
];
