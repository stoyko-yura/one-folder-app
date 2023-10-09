import { Router } from 'express';

import { userControllers } from '@/controllers';

const router: Router = Router();

// Get users
router.get('/', userControllers.getUsers);

// Get user
router.get('/:userId', userControllers.getUser);

// Put user
router.put('/:userId', userControllers.putUser);

// Delete user
router.delete('/:userId', userControllers.deleteUser);

export const userRouter = router;
