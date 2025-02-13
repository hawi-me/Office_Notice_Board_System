const express = require('express');
const router = express.Router();
const {protect} = require('../Middleware/authMiddleware');
const {registerUser, loginUser,getUser} = require('../Controllers/userController');
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.get('/me',protect, getUser);
module.exports = router;