const express = require('express');
const {
  getAllDocuments,
  getDocument,
  createDocument,
  deleteDocument,
  updateDocument,
} = require('../controllers/document');
const { protect, restrictTo } = require('../controllers/auth');

const router = express.Router();

router.route('/').get(protect, restrictTo('user'), getAllDocuments).post(protect, restrictTo('user'), createDocument);
router
  .route('/:id')
  .get(protect, restrictTo('user'), getDocument)
  .patch(protect, restrictTo('user'), updateDocument)
  .delete(protect, restrictTo('user'), deleteDocument);

module.exports = router;
