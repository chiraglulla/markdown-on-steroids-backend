const Document = require('../models/document');
const asyncWrapper = require('../utils/asyncWrapper');
const ErrorHandler = require('../utils/createError');

// @desc Get All Documents
// @route GET /api/v1/document
const getAllDocuments = asyncWrapper(async (req, res, next) => {
  const documents = await Document.find();
  res.status(200).json({
    status: 'success',
    data: {
      documents,
    },
  });
});

// @desc Get Document based on ID
// @route GET /api/v1/document/:id
const getDocument = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const doc = await Document.findById(id);

  if (!doc) {
    const err = new ErrorHandler('No such document found', 404);
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: {
      document: doc,
    },
  });
});

// @desc Create new document
// @route POST /api/v1/document/
const createDocument = asyncWrapper(async (req, res, next) => {
  const doc = req.body;
  const newDoc = await Document.create(doc);
  res.status(201).json({
    status: 'success',
    data: {
      document: newDoc,
    },
  });
});

// @desc Update Document
// @route PATCH /api/v1/document/:id
const updateDocument = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  const doc = await Document.findByIdAndUpdate(id, changes, {
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

// @desc Delete document
// @route DELETE /api/v1/document/:id
const deleteDocument = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const doc = await Document.findByIdAndDelete(id);

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
  getAllDocuments,
  getDocument,
  createDocument,
  deleteDocument,
  updateDocument,
};
