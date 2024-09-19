import createHttpError from 'http-errors';
import { getAllStudents, getStudentById } from '../services/students.js';

export const getStudentsController = async (req, res, next) => {
  const students = await getAllStudents();

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
