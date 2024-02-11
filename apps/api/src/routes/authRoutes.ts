import { Router } from 'express';

import { authControllers } from '@/controllers';
import {
  changePasswordValidation,
  checkAuth,
  checkValidation,
  signInValidation,
  signUpValidation
} from '@/middleware';

const router: Router = Router();

// Sign in
router.post('/sign-in', signInValidation, checkValidation, authControllers.signIn);

// Sign up
router.post('/sign-up', signUpValidation, checkValidation, authControllers.signUp);

// Get me
router.get('/me', checkAuth, authControllers.getMe);

// Change password
router.put(
  '/change-password',
  checkAuth,
  changePasswordValidation,
  checkValidation,
  authControllers.changePassword
);

export const authRoutes = router;
