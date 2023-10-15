import { Router } from 'express';

import { authControllers } from '@/controllers';
import {
  changePasswordValidation,
  checkAuth,
  loginValidation,
  registerValidation
} from '@/middleware';

const router: Router = Router();

// Login
router.post('/login', loginValidation, authControllers.login);

// Register
router.post('/register', registerValidation, authControllers.register);

// Get me
router.get('/me', checkAuth, authControllers.getMe);

// Change password
router.put('/change-password', checkAuth, changePasswordValidation, authControllers.changePassword);

export const authRouter = router;
