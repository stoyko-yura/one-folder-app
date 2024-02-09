import { Router } from 'express';

import { commentControllers } from '@/controllers';
import { pagination, postCommetValidation, putCommentValidation } from '@/middleware';

const router: Router = Router();

// Get comments
router.get('/', pagination, commentControllers.getComments);

// Get comment
router.get('/:commentId', commentControllers.getComment);

// Get comment's ratings
router.get('/:commentId/ratings', pagination, commentControllers.getCommentRatings);

// Post comment
router.post('/', postCommetValidation, commentControllers.postComment);

// Put comment
router.put('/:commentId', putCommentValidation, commentControllers.putComment);

// Delete comment
router.delete('/:commentId', commentControllers.deleteComment);

export const commentRoutes = router;
