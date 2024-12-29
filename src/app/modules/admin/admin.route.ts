import { Router } from 'express';
import { USER_ROLE } from '../user/user.constant';
import authorize from '../../middlewares/auth';
import { adminController } from './admin.controller';

const router = Router();

router.patch(
  '/users/:id/block',
  authorize(USER_ROLE.admin),
  adminController.blockUser,
);

router.delete('/blogs/:id', authorize(USER_ROLE.admin), adminController.deleteBlog);

export const adminRoutes = router;