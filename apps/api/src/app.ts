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
app.use('/api/users', routes.userRoutes);
app.use('/api/auth', routes.authRoutes);
app.use('/api/folders', routes.folderRoutes);
app.use('/api/folder-accesses', routes.folderAccessRoutes);
app.use('/api/ratings', routes.ratingRoutes);
app.use('/api/roles', routes.roleRoutes);
app.use('/api/categories', routes.categoryRoutes);
app.use('/api/software', routes.softwareRoutes);

export default app;
