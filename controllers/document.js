const Document = require('../models/document');
const asyncWrapper = require('../utils/asyncWrapper');
const ErrorHandler = require('../utils/createError');
const factory = require('./handlerFactory');

// @desc Get All Documents
// @route GET /api/v1/document
const getAllDocuments = asyncWrapper(async (req, res, next) => {
  const documents = await Document.find({ owner: req.user._id });
  res.status(200).json({
    status: 'success',
    statusCode: 200,
    data: {
      documents,
    },
  });
});

// @desc Get Document based on ID
// @route GET /api/v1/document/:id
const getDocument = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const doc = await Document.findOne({ _id: id, owner: req.user._id });

  if (!doc) {
    const err = new ErrorHandler('No such document found', 404);
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    data: {
      document: doc,
    },
  });
});

// @desc Create new document
// @route POST /api/v1/document/
const createDocument = factory.createOne(Document);

// @desc Update Document
// @route PATCH /api/v1/document/:id
const updateDocument = factory.updateOne(Document);

// @desc Delete document
// @route DELETE /api/v1/document/:id
const deleteDocument = factory.deleteOne(Document);

module.exports = {
  getAllDocuments,
  getDocument,
  createDocument,
  deleteDocument,
  updateDocument,
};
