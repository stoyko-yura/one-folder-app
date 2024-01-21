import type { ValidationChain } from 'express-validator';
import { body } from 'express-validator';

import { dbEnums } from '@/config';

// Folders validation
export const postFolderValidation: ValidationChain[] = [
  body('authorId').not().notEmpty().withMessage('Author id is required'),
  body('access')
    .optional()
    .default('PUBLIC')
    .toUpperCase()
    .isIn(dbEnums.accesses)
    .withMessage(`Access can be only ${dbEnums.accesses.join(', ')}`),
  body('title')
    .not()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 24, min: 4 })
    .withMessage('Title must contain from 4 to 24 characters'),
  body('description')
    .optional({ nullable: true })
    .isLength({ max: 200 })
    .withMessage('Description must be less than or equal to 200'),
  body('image').optional({ nullable: true }).isURL().withMessage('Wrong image url format')
];

export const putFolderValidation: ValidationChain[] = [
  body('access')
    .optional()
    .toUpperCase()
    .isIn(dbEnums.accesses)
    .withMessage(`Access can be only ${dbEnums.accesses.join(', ')}`),
  body('title')
    .optional()
    .isLength({ max: 24, min: 4 })
    .withMessage('Title must contain from 4 to 24 characters'),
  body('description')
    .optional({ nullable: true })
    .isLength({ max: 200 })
    .withMessage('Description must be less than or equal to 200'),
  body('image').optional({ nullable: true }).isURL().withMessage('Wrong image url format')
];
