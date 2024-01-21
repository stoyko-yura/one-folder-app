import type { ValidationChain } from 'express-validator';
import { body } from 'express-validator';

// Categories validation
export const postCategoryValidation: ValidationChain[] = [
  body('name')
    .not()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 20, min: 1 })
    .withMessage('Name must contain from 1 to 20 characters')
];

export const putCategoryValidation: ValidationChain[] = [
  body('name')
    .not()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 20, min: 1 })
    .withMessage('Name must contain from 1 to 20 characters')
];
