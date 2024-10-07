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
import { ROLES } from '../constants/index.js';
import { checkRoles } from '../middlewares/checkRoles.js';
const router = Router();
router.use(authenticate);

router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getStudentsController));
router.get('/:studentId', isValidId, ctrlWrapper(getStudentsByIdController));
router.post(
  '/',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);
router.delete(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteStudentController),
);
router.put(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(upsertStudentController),
);

export default router;
