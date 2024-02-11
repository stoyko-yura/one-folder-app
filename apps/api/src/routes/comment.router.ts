import { Router } from 'express';

import { commentControllers } from '@/controllers';
import { checkValidation, commentValidation, pagination } from '@/middleware';

const router: Router = Router();

// Get comments
router.get('/', pagination, commentControllers.getComments);

// Get comment
router.get('/:commentId', commentControllers.getComment);

// Get comment's ratings
router.get('/:commentId/ratings', pagination, commentControllers.getCommentRatings);

// Post comment
router.post(
  '/',
  commentValidation.postCommetValidation,
  checkValidation,
  commentControllers.postComment
);

// Put comment
router.put(
  '/:commentId',
  commentValidation.putCommentValidation,
  checkValidation,
  commentControllers.putComment
);

// Delete comment
router.delete('/:commentId', commentControllers.deleteComment);

export const commentRouter = router;
