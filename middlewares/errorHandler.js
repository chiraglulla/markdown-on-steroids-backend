const ErrorHandler = require('../utils/createError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} is ${err.value}`;
  return new ErrorHandler(message, 400).sendError();
};

const handleDuplicateFieldsDB = (err) => {
  const [value] = err.errmsg.match(/(["'])(\\?.)*?\1/);
  const message = `Duplicate field value: ${value}. Please use another value`;

  return new ErrorHandler(message, 400).sendError();
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new ErrorHandler(message, 400).sendError();
};

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    error: err,
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status || 'error',
      message: err.message,
    });
  } else {
    console.error('Error🔥', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const errorHandler = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErrorDB(error);

    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    sendProdError(error, res);
  }
};

module.exports = errorHandler;
