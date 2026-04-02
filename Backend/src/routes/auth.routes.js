const express = require('express');
const authController = require('../controllers/auth.controllers')
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/profile', authMiddleware, authController.getUserProfile);
router.put('/profile', authMiddleware, upload.single('img'), authController.updateUserProfile);


module.exports = router;
