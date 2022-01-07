class ErrorHandler {
  constructor(message, statusCode) {
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.statusCode = statusCode;
    this.message = message;

    // Error.captureStackTrace(this, this.constructor)
    // This line would not pollute the console with the error trace.
  }

  sendError() {
    const err = new Error(this.message);
    err.status = this.status;
    err.statusCode = this.statusCode;

    return err;
  }
}

module.exports = ErrorHandler;
