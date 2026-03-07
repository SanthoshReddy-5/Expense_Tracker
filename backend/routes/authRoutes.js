const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { signUpUser, signInUser, getUserInfo } = require('../controllers/authController');

const router = express.Router();

router.post('/SignUp', signUpUser);
router.post('/SignIn', signInUser);
router.get('/GetUserInfo', protect, getUserInfo);

module.exports = router;