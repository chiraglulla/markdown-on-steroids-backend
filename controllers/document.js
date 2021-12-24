const Document = require('../models/document');

// @desc Get All Documents
// @route GET /api/v1/document
const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find();

    res.status(200).json({
      status: 'success',
      data: {
        documents,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failure',
      message: err,
    });
  }
};

// @desc Get Document based on ID
// @route GET /api/v1/document/:id
const getDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        document: doc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failure',
      message: err,
    });
  }
};

// @desc Create new document
// @route POST /api/v1/document/
const createDocument = async (req, res) => {
  try {
    const doc = req.body;
    const newDoc = await Document.create(doc);

    res.status(201).json({
      status: 'success',
      data: {
        document: newDoc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failure',
      message: err,
    });
  }
};

// @desc Delete document
// @route DELETE /api/v1/document/:id
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await Document.findByIdAndDelete(id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failure',
      message: err,
    });
  }
};

module.exports = {
  getAllDocuments,
  getDocument,
  createDocument,
  deleteDocument,
};
