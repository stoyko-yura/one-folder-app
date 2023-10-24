import { Router } from 'express';

import { softwareCategoryControllers } from '@/controllers';
import {
  createSoftwareCategoryValidation,
  editSoftwareCategoryValidation,
  pagination
} from '@/middleware';

const router: Router = Router();

// Get software categories
router.get('/', pagination, softwareCategoryControllers.getSoftwareCategories);

// Get software category
router.get('/:softwareCategoryId', softwareCategoryControllers.getSoftwareCategory);

// Post software catergory
router.post(
  '/',
  createSoftwareCategoryValidation,
  softwareCategoryControllers.postSoftwareCategory
);

// Put software category
router.put(
  '/:softwareCategoryId',
  editSoftwareCategoryValidation,
  softwareCategoryControllers.putSoftwareCategory
);

// Delete software category
router.delete('/softwareCategoryId', softwareCategoryControllers.deleteSoftwareCategory);

export const softwareCategoryRouter = router;
