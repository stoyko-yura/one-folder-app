import { Router } from 'express';

import { ratingControllers } from '@/controllers';
import { checkValidation, pagination, ratingValidation } from '@/middleware';

const router: Router = Router();

// Get ratings
router.get('/', pagination, ratingControllers.getRatings);

// Get rating
router.get('/:ratingId', ratingControllers.getRating);

// Post rating
router.post(
  '/',
  ratingValidation.postRatingValidation,
  checkValidation,
  ratingControllers.postRating
);

// Put rating
router.put(
  '/:ratingId',
  ratingValidation.putRatingValidation,
  checkValidation,
  ratingControllers.putRating
);

// Delete rating
router.delete('/:ratingId', ratingControllers.deleteRating);

export const ratingRouter = router;
