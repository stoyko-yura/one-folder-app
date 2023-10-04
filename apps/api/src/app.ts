import cors from 'cors';
import type { Application } from 'express';
import express from 'express';

const app: Application = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes

export default app;
