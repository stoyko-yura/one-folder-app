import { Router } from 'express';

import { ratingControllers } from '@/controllers';
import { pagination } from '@/middleware';

const router: Router = Router();

// Get ratings
router.get('/', pagination, ratingControllers.getRatings);

// Get rating
router.get('/:ratingId', ratingControllers.getRating);

// Post rating
router.post('/', ratingControllers.postRating);

// Put rating
router.put('/:ratingId', ratingControllers.putRating);

// Delete rating
router.delete('/:ratingId', ratingControllers.deleteRating);

export const ratingRouter = router;
