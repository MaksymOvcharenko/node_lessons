import { Router } from 'express';

import {
  createStudentController,
  deleteStudentController,
  getStudentsByIdController,
  getStudentsController,
  upsertStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../validation/isValid.js';
const router = Router();

router.get('/students', ctrlWrapper(getStudentsController));
router.get(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(getStudentsByIdController),
);
router.post(
  '/students',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);
router.delete(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(deleteStudentController),
);
router.put(
  '/students/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(upsertStudentController),
);

export default router;
