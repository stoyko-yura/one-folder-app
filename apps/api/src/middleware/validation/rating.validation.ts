import type { ValidationChain } from 'express-validator';
import { body } from 'express-validator';

// Ratings validation
export const postRatingValidation: ValidationChain[] = [
  body('userId').not().isEmpty().withMessage('User id is required'),
  body('rating')
    .not()
    .isEmpty()
    .withMessage('Rating is required')
    .isInt({ max: 5, min: 1 })
    .withMessage('Rating must be from 1 to 5')
];

export const putRatingValidation: ValidationChain[] = [
  body('userId').not().isEmpty().withMessage('User id is required'),
  body('rating').optional().isInt({ max: 5, min: 1 }).withMessage('Rating must be from 1 to 5')
];
