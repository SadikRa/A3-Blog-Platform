import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { blogRoutes } from './app/modules/blog/blog.router';
import { userRoutes } from './app/modules/user/user.router';
import { authRoutes } from './app/modules/auth/auth.route';
import { adminRoutes } from './app/modules/admin/admin.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/', blogRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const test = (req: Request, res: Response) => {
  res.send('hello Sadik');
};

app.get('/', test);

// app.use(globalErrorHandler);

//Not Found
// app.use(notFound);

export default app;
