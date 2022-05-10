const asyncWrapper = require('../utils/asyncWrapper');
const ErrorHandler = require('../middlewares/errorHandler');

const createOne = (Model) =>
  asyncWrapper(async (req, res, next) => {
    const doc = req.body;
    const newDoc = await Model.create({ ...doc, owner: req.user._id });
    res.status(201).json({
      status: 'success',
      statusCode: 201,
      data: {
        document: newDoc,
      },
    });
  });

const updateOne = (Model) =>
  asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    const doc = await Model.findByIdAndUpdate(id, changes, {
      runValidators: true,
      new: true,
    });

    if (!doc) {
      const err = new ErrorHandler('No such document found', 404);
      return next(err);
    }

    res.status(204).json({
      status: 'success',
      data: {
        document: doc,
      },
    });
  });

const deleteOne = (Model) =>
  asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
      const err = new ErrorHandler('No such document found', 404);
      return next(err);
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

module.exports = {
  createOne,
  updateOne,
  deleteOne,
};
