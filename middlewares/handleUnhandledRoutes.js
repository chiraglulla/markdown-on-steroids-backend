const ErrorHandler = require('../utils/createError');

const handleUnhandledRoutes = (req, res, next) => {
  const err = new ErrorHandler(
    `Can't find ${req.originalUrl} on this server`,
    404
  ).sendError();

  next(err);
};

module.exports = handleUnhandledRoutes;
