const express = require('express');
const {
  getAllDocuments,
  getDocument,
  createDocument,
  deleteDocument,
  updateDocument,
} = require('../controllers/document');

const router = express.Router();

router.route('/').get(getAllDocuments).post(createDocument);
router
  .route('/:id')
  .get(getDocument)
  .patch(updateDocument)
  .delete(deleteDocument);

module.exports = router;
