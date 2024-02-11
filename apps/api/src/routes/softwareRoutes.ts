import { Router } from 'express';

import { softwareControllers } from '@/controllers';
import {
  checkValidation,
  pagination,
  postSoftwareValidation,
  putSoftwareValidation
} from '@/middleware';

const router: Router = Router();

// Get software
router.get('/', pagination, softwareControllers.getSoftwares);

// Get software
router.get('/:softwareId', softwareControllers.getSoftware);

// Get software's folders
router.get('/:softwareId/folders', pagination, softwareControllers.getSoftwareFolders);

// Get software's ratings
router.get('/:softwareId/ratings', pagination, softwareControllers.getSoftwareRatings);

// Get software's categories
router.get('/:softwareId/categories', pagination, softwareControllers.getSoftwareCategories);

// Post software
router.post('/', postSoftwareValidation, checkValidation, softwareControllers.postSoftware);

// Put software
router.put('/:softwareId', putSoftwareValidation, checkValidation, softwareControllers.putSoftware);

// Put software's categories
router.put('/:softwareId/categories', softwareControllers.putSoftwareCategories);

// Delete software
router.delete('/:softwareId', softwareControllers.deleteSoftware);

export const softwareRoutes = router;
