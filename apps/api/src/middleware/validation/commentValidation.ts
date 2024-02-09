import { body, param, type ValidationChain } from 'express-validator';

// Comments validation
export const postCommetValidation: ValidationChain[] = [
  body('authorId').not().notEmpty().withMessage('Author id is required'),
  body('folderId').not().notEmpty().withMessage('Folder id is required'),
  body('message')
    .not()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 200 })
    .withMessage('Message must be less than 200 characters')
];

export const putCommentValidation: ValidationChain[] = [
  param('commentId').not().notEmpty().withMessage('Comment id is required'),
  body('message')
    .not()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 200 })
    .withMessage('Message must be less than 200 characters')
];
