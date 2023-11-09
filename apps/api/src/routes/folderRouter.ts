import { Router } from 'express';

import { folderControllers } from '@/controllers';
import { pagination } from '@/middleware';

const router: Router = Router();

// Get folders
router.get('/', pagination, folderControllers.getFolders);

// Get folder
router.get('/:folderId', folderControllers.getFolder);

// Get folder comments
router.get('/:folderId/comments', pagination, folderControllers.getFolderComments);

// Get folder ratings
router.get('/:folderId/ratings', pagination, folderControllers.getFolderRatings);

// Get folder software
router.get('/:folderId/software', pagination, folderControllers.getFolderSoftware);

// Post folder
router.post('/', folderControllers.postFolder);

// Delete folder
router.delete('/:folderId', folderControllers.deleteFolder);

export const folderRouter = router;
