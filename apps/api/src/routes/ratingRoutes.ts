import { Router } from 'express';

import { ratingControllers } from '@/controllers';
import { pagination, postRatingValidation, putRatingValidation } from '@/middleware';

const router: Router = Router();

// Get ratings
router.get('/', pagination, ratingControllers.getRatings);

// Get rating
router.get('/:ratingId', ratingControllers.getRating);

// Post rating
router.post('/', postRatingValidation, ratingControllers.postRating);

// Put rating
router.put('/:ratingId', putRatingValidation, ratingControllers.putRating);

// Delete rating
router.delete('/:ratingId', ratingControllers.deleteRating);

export const ratingRoutes = router;
