import { Router } from 'express';

import { roleControllers } from '@/controllers';

const router: Router = Router();

// Get roles
router.get('/', roleControllers.getRoles);

export const roleRouter = router;
