import { Router } from 'express';

import { ratingControllers } from '@/controllers';
import {
  checkValidation,
  pagination,
  postRatingValidation,
  putRatingValidation
} from '@/middleware';

const router: Router = Router();

// Get ratings
router.get('/', pagination, ratingControllers.getRatings);

// Get rating
router.get('/:ratingId', ratingControllers.getRating);

// Post rating
router.post('/', postRatingValidation, checkValidation, ratingControllers.postRating);

// Put rating
router.put('/:ratingId', putRatingValidation, checkValidation, ratingControllers.putRating);

// Delete rating
router.delete('/:ratingId', ratingControllers.deleteRating);

export const ratingRoutes = router;
