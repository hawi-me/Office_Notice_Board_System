const express = require('express');
const router = express.Router();
const {protect} = require('../Middleware/authMiddleware');
const {createNotice, getNotice, updateNotice, deleteNotice} = require('../Controllers/noticeController');
router.route('/').get(getNotice).post(protect,createNotice);
router.route('/:id').put(protect,updateNotice).delete(protect,deleteNotice);
module.exports = router;