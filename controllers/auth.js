const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncWrapper = require('../utils/asyncWrapper');
const ErrorHandler = require('../utils/createError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = asyncWrapper(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
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

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

module.exports = {
  signup,
  login,
};
