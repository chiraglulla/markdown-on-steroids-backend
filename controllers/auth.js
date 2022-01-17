const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const asyncWrapper = require('../utils/asyncWrapper');
const ErrorHandler = require('../utils/createError');
const sendEmail = require('../utils/sendEmail');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const signup = asyncWrapper(async (req, res, next) => {
  const { name, email, password, confirmPassword, passwordChangedAt } =
    req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
    passwordChangedAt,
  });

  createAndSendToken(newUser, 201, res);
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new ErrorHandler(
      'Please provide email and password',
      400
    ).sendError();

    return next(err);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    const err = new ErrorHandler(
      'Incorrect email or password',
      401
    ).sendError();

    return next(err);
  }

  createAndSendToken(user, 200, res);
});

// Authentication
const protect = asyncWrapper(async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  if (!token) {
    const err = new ErrorHandler('Please Log In', 401).sendError();
    return next(err);
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    const err = new ErrorHandler('User no longer exists', 401).sendError();
    next(err);
  }

  if (user.changedPasswordAfter(decoded.iat)) {
    const err = new ErrorHandler('Recently changed password', 401).sendError();
    next(err);
  }

  req.user = user;
  next();
});

// Authorization
const restrictTo = (...roles) => {
  return (req, res, next) => {
    const { user } = req;
    if (!roles.includes(user.role)) {
      const err = new ErrorHandler('No permission granted', 403).sendError();
      next(err);
    }

    next();
  };
};

const forgotPassword = asyncWrapper(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const err = new ErrorHandler(
      'No user with that email address',
      404
    ).sendError();
    next(err);
  }

  const token = user.generateResetToken();
  await user.save({ validateBeforeSave: false });

  const url = `${req.protocol}://localhost:3000/reset/${token}`;

  const message = `Forgot your password? Change it right away using this link: ${url}. Ignore if this is not your activity. Valid for 10 minute.`;

  try {
    await sendEmail({
      email,
      subject: 'Password Reset Mail',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to your email.',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    const err = new ErrorHandler(
      'There was an error sending an email',
      500
    ).sendError();

    return next(err);
  }
});

const resetPassword = asyncWrapper(async (req, res, next) => {
  const { token } = req.params;
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    const err = new ErrorHandler(
      'Token is invalid or has expired',
      400
    ).sendError();
    next(err);
  }
  const { password, confirmPassword } = req.body;
  user.password = password;
  user.confirmPassword = confirmPassword;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password reset successful',
  });
});

const updatePassword = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { passwordCurrent, password, confirmPassword } = req.body;
  const user = await User.findById(id).select('+password');

  if (!(await user.correctPassword(passwordCurrent, user.password))) {
    const err = new ErrorHandler(
      'Your current password is wrong',
      401
    ).sendError();
    return next(err);
  }

  user.password = password;
  user.confirmPassword = confirmPassword;

  await user.save();

  createAndSendToken(user, 200, res);
});

module.exports = {
  signup,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
};
