import { Router } from 'express';

import { softwareControllers } from '@/controllers';
import { pagination } from '@/middleware';

const router: Router = Router();

// Get software
router.get('/', pagination, softwareControllers.getSoftwares);

// Get software
router.get('/:softwareId', softwareControllers.getSoftware);

// Post software
router.post('/', softwareControllers.postSoftware);

// Put software
router.put('/:softwareId', softwareControllers.putSoftware);

// Delete software
router.delete('/:softwareId', softwareControllers.deleteSoftware);

export const softwareRouter = router;
