import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { blogRoutes } from './app/modules/blog/blog.router';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', blogRoutes);

const test = (req: Request, res: Response) => {
  res.send('hello Sadik');
};

app.get('/', test);

// app.use(globalErrorHandler);

//Not Found
// app.use(notFound);

export default app;
