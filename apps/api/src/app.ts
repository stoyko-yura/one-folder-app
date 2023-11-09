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
app.use('/api/folders', routes.folderRouter);
app.use('/api/ratings', routes.ratingRouter);
app.use('/api/roles', routes.roleRouter);
app.use('/api/categories', routes.categoryRouter);
app.use('/api/software', routes.softwareRouter);

export default app;
