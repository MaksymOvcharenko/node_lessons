// src/routers/index.js

import { Router } from 'express';
import studentsRouter from './students.js';
import authRouter from './auth.js';

const router = Router();
router.use('/auth', authRouter);
router.use('/students', studentsRouter);

export default router;
