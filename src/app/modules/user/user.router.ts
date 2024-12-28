import express from 'express';
import { userController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

//order a book
router.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  userController.createUser,
);

export const userRoutes = router;
