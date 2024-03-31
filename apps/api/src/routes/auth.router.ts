import { Router } from 'express';

import { authControllers } from '@/controllers';
import { authValidation, checkAuth, checkValidation } from '@/middleware';

const router: Router = Router();

// Sign in
router.post('/sign-in', authValidation.signInValidation, checkValidation, authControllers.signIn);

// Sign up
router.post('/sign-up', authValidation.signUpValidation, checkValidation, authControllers.signUp);

// Get me
router.get('/me', checkAuth, authControllers.getMe);

// Change password
router.put(
  '/change-password',
  checkAuth,
  authValidation.changePasswordValidation,
  checkValidation,
  authControllers.changePassword
);

// Password recovery
router.post(
  '/password-recovery',
  authValidation.passwordRecoveryValidation,
  checkValidation,
  authControllers.passwordRecovery
);

export const authRouter = router;
