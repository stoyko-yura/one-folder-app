import type { ValidationChain } from 'express-validator';
import { body } from 'express-validator';

import { dbEnums } from '@/config';

// Users validation
export const putUserValidation: ValidationChain[] = [
  body('login')
    .optional()
    .isLength({ max: 24, min: 4 })
    .withMessage('Login must contain from 4 to 24 characters'),
  body('email').optional().isEmail().withMessage('Wrong email format'),
  body('bio')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Bio must be less that or equal to 200'),
  body('username')
    .optional()
    .isLength({ max: 24 })
    .withMessage('Username must be less than or equal to 24'),
  body('role')
    .optional()
    .toUpperCase()
    .isIn(dbEnums.roles)
    .withMessage(`Role can be only ${dbEnums.roles.join(', ')}`)
];
