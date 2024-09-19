// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import studentsRouter from './routers/students.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
// import { getAllStudents, getStudentById } from './services/students.js';
const PORT = Number(env('PORT', '3000'));
export const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(studentsRouter);
  app.use('*', notFoundHandler); // і ця функція не спрацьовую помилка, постман видає помилку 404 але не дає текст той що в нотфоунд.
  // app.use('*', errorHandler);
  app.use(errorHandler); // якщо помилки опущу нижче, то не буде працювати відповідь 404 студент, нот фоунд.
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
