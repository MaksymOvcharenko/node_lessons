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
import { authenticate } from '../middlewares/authenticate.js';
const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(getStudentsController));
router.get('/:studentId', isValidId, ctrlWrapper(getStudentsByIdController));
router.post(
  '/',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);
router.delete('/:studentId', isValidId, ctrlWrapper(deleteStudentController));
router.put(
  '/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(upsertStudentController),
);

export default router;
