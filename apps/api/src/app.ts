import cors from 'cors';
import type { Application } from 'express';
import express from 'express';

import * as routes from '@/routes';

const app: Application = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use('/api/users', routes.userRouter);
app.use('/api/auth', routes.authRouter);

export default app;
