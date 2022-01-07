class ErrorHandler {
  constructor(message, statusCode) {
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;
    // Error.captureStackTrace(this, this.constructor)
    // This line would not pollute the console with the error trace.
  }

  sendError() {
    const err = new Error(this.message);
    err.status = this.status;
    err.statusCode = this.statusCode;
    err.isOperational = this.isOperational;
    return err;
  }
}

module.exports = ErrorHandler;
