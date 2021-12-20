// @desc Get All Documents
// @route GET /api/v1/document
const getAllDocuments = (req, res) => {
  const documents = [
    {
      id: 1,
      string: '<h1>Hello I am document 1<h1>',
    },
    {
      id: 2,
      string: '<h1>Hello I am document 2<h1>',
    },
    {
      id: 3,
      string: '<h1>Hello I am document 3<h1>',
    },
  ];
  res.status(200).json({
    status: 'success',
    data: {
      documents,
    },
  });
};

// @desc Get Document based on ID
// @route GET /api/v1/document/:id
const getDocument = (req, res) => {
  const { id } = req.params;
  const doc = {
    id,
    string: `Hello I am document ${id}`,
  };
  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
};

// @desc Create new document
// @route POST /api/v1/document/
const createDocument = (req, res) => {
  const newDoc = '<New Document here>';
  res.status(201).json({
    status: 'success',
    data: {
      newDoc,
    },
  });
};

// @desc Delete document
// @route DELETE /api/v1/document/:id
const deleteDocument = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

module.exports = {
  getAllDocuments,
  getDocument,
  createDocument,
  deleteDocument,
};
