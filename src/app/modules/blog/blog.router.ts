import express from 'express';
import { blogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { USER_ROLE } from '../user/user.constant';
import authorize from '../../middlewares/auth';

const router = express.Router();

//order a book
router.post(
  '/blogs',
  authorize(USER_ROLE.user), 
  validateRequest(BlogValidation.blogValidationSchema),
  blogController.createBlog,
);



export const blogRoutes = router;
