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

module.exports = {
  getAllDocuments,
};
