import createHttpError from 'http-errors';
import {
  createStudents,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from '../services/students.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getStudentsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const students = await getAllStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    data: students,
  });
};
export const getStudentsByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  if (!student) {
    throw createHttpError(404, 'Students not found');
  }

  res.status(200).json({
    data: student,
  });
};
export const createStudentController = async (req, res) => {
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const student = await createStudents(req.body, photoUrl);
  // const photo = req.file;
  res.status(201).json({
    status: 201,
    message: 'Successfully created a student!',
    data: student,
  });
};

export const deleteStudentController = async (req, res, next) => {
  const { studentId } = await req.params;
  const student = await deleteStudent(studentId);
  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(204).send();
};
export const upsertStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateStudent(
    studentId,
    { ...req.body, photo: photoUrl },
    {
      upsert: true,
    },
  );

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: result.student,
  });
};
