import express from 'express';
import { blogController } from './blog.controller';

const router = express.Router();

//order a book
router.post('/blogs', blogController.createBlog);

export const blogRoutes = router;
