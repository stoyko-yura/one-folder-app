import { Router } from 'express';

import { authControllers } from '@/controllers';
import {
  changePasswordValidation,
  checkAuth,
  signInValidation,
  signUpValidation
} from '@/middleware';

const router: Router = Router();

// Sign in
router.post('/sign-in', signInValidation, authControllers.signIn);

// Sign up
router.post('/sign-up', signUpValidation, authControllers.signUp);

// Get me
router.get('/me', checkAuth, authControllers.getMe);

// Change password
router.put('/change-password', checkAuth, changePasswordValidation, authControllers.changePassword);

export const authRoutes = router;
