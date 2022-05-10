const User = require('../models/user');
const asyncWrapper = require('../utils/asyncWrapper');
const ErrorHandler = require('../utils/createError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowed) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowed.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
};

const updateMe = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;
  if (req.body.password || req.body.confirmPassword) {
    const err = new ErrorHandler(
      'This route is not for password updates.'
    ).sendError();
    return next(err);
  }

  const updateData = filterObj(req.body, 'name', 'email');

  const user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const deleteMe = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const deleteUser = factory.deleteOne(User);
const updateUser = factory.updateOne(User);

module.exports = {
  updateMe,
  deleteMe,
  deleteUser,
};
