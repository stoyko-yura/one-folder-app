import { Router } from 'express';

import { folderAccessControllers } from '@/controllers';

const router: Router = Router();

// Get folder's accesses
router.get('/', folderAccessControllers.getFolderAccesses);

export const folderAccessRouter = router;
