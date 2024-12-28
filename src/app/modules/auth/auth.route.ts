import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { authValidation } from './auth.validation';

const router = Router();

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

export const authRoutes = router;