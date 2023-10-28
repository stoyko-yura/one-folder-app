import { Router } from 'express';

import { userControllers } from '@/controllers';
import { editUserValidation, pagination } from '@/middleware';

const router: Router = Router();

// Get users
router.get('/', pagination, userControllers.getUsers);

// Get user
router.get('/:userId', userControllers.getUser);

// Get user comments
router.get('/:userId/comments', pagination, userControllers.getUserComments);

// Get user folders
router.get('/:userId/folders', pagination, userControllers.getUserFolders);

// Put user
router.put('/:userId', editUserValidation, userControllers.putUser);

// Delete user
router.delete('/:userId', userControllers.deleteUser);

export const userRouter = router;
