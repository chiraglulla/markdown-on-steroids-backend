const ErrorHandler = require('../utils/createError');

const handleJWTError = (err) =>
  new ErrorHandler('Invalid token', 401).sendError();

const handleJWTExpiredError = (err) =>
  new ErrorHandler('Token expired, please log in again', 401).sendError();

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
  const message = `${errors.join('. ')}`;
  return new ErrorHandler(message, 400).sendError();
};

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    error: err,
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      status: err.status || 'error',
      message: err.message,
    });
  } else {
    console.error('Error🔥', err);

    res.status(500).json({
      statusCode: err.statusCode,
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const errorHandler = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    console.log(err.stack);
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErrorDB(error);

    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (err.name === 'JsonWebTokenError') error = handleJWTError(err);
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError(err);
    sendProdError(error, res);
  }
};

module.exports = errorHandler;
