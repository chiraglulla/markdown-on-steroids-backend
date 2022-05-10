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

router.use(protect);
router.use(restrictTo('user'));

router.route('/').get(getAllDocuments).post(createDocument);
router
  .route('/:id')
  .get(getDocument)
  .patch(updateDocument)
  .delete(deleteDocument);

module.exports = router;
