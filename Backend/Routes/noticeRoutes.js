const express = require('express');
const router = express.Router();
const {createNotice, getNotice, updateNotice, deleteNotice} = require('../Controllers/noticeController');
router.route('/').get(getNotice).post(createNotice);
router.route('/:id').put(updateNotice).delete(deleteNotice);
module.exports = router;