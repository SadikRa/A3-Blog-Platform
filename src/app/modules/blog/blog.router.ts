import express from 'express';
import { blogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { USER_ROLE } from '../user/user.constant';
import authorize from '../../middlewares/auth';

const router = express.Router();

//post blog 
router.post(
  '/blogs',
  authorize(USER_ROLE.user), 
  validateRequest(BlogValidation.blogValidationSchema),
  blogController.createBlog,
);

//update blog
router.patch(
  '/blogs/:id',
  authorize(USER_ROLE.user),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  blogController.updateBlog,
);

// delete blog
router.delete(
  '/blogs/:id',
  authorize(USER_ROLE.user, USER_ROLE.admin),
  blogController.deleteBlog,
);

// get all blog
router.get('/blogs', blogController.getAllBlogs);


export const blogRoutes = router;
