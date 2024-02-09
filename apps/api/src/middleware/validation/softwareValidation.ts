import type { ValidationChain } from 'express-validator';
import { body } from 'express-validator';

// Software validation
export const postSoftwareValidation: ValidationChain[] = [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('url')
    .not()
    .isEmpty()
    .withMessage('Url is required')
    .isURL()
    .withMessage('Wrong image url format'),
  body('icon').optional().isURL().withMessage('Wrong image url format'),
  body('description')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Description must be less than or equal to 100'),
  body('categories')
    .not()
    .isEmpty()
    .withMessage('Categories is required')
    .isArray()
    .withMessage('Categories is array')
];

export const putSoftwareValidation: ValidationChain[] = [
  body('name').optional().not().isEmpty().withMessage('Name is required'),
  body('url')
    .optional()
    .not()
    .isEmpty()
    .withMessage('Url is required')
    .isURL()
    .withMessage('Wrong image url format'),
  body('icon').optional().isURL().withMessage('Wrong image url format'),
  body('description')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Description must be less than or equal to 100')
];
