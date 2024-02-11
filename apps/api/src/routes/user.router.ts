import { Router } from 'express';

import { userControllers } from '@/controllers';
import { checkValidation, pagination, userValidation } from '@/middleware';

const router: Router = Router();

// Get users
router.get('/', pagination, userControllers.getUsers);

// Get user
router.get('/:userId', userControllers.getUser);

// Get user's comments
router.get('/:userId/comments', pagination, userControllers.getUserComments);

// Get user's folders
router.get('/:userId/folders', pagination, userControllers.getUserFolders);

// Put user
router.put('/:userId', userValidation.putUserValidation, checkValidation, userControllers.putUser);

// Delete user
router.delete('/:userId', userControllers.deleteUser);

export const userRouter = router;
