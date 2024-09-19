export const notFoundHandler = (err, req, res, next) => {
  console.log(err);

  res.status(404).json({
    message: 'Route not Found',
    error: err.message,
  });
  // next(createHttpError(404, 'Resource not found'));
};
