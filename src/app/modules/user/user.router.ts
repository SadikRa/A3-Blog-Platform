import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

//order a book
router.post('/register', userController.createUser);

export const userRoutes = router;
