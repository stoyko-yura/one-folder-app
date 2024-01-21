import { Router } from 'express';

import { folderControllers } from '@/controllers';
import { pagination, postFolderValidation, putFolderValidation } from '@/middleware';

const router: Router = Router();

// Get folders
router.get('/', pagination, folderControllers.getFolders);

// Get folder
router.get('/:folderId', folderControllers.getFolder);

// Get folder's comments
router.get('/:folderId/comments', pagination, folderControllers.getFolderComments);

// Get folder's ratings
router.get('/:folderId/ratings', pagination, folderControllers.getFolderRatings);

// Get folder's software
router.get('/:folderId/software', pagination, folderControllers.getFolderSoftware);

// Post folder
router.post('/', postFolderValidation, folderControllers.postFolder);

// Put folder
router.put('/:folderId', putFolderValidation, folderControllers.putFolder);

// Delete folder
router.delete('/:folderId', folderControllers.deleteFolder);

export const folderRoutes = router;
