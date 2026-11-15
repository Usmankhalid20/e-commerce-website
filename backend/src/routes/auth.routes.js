'use strict';

const { Router } = require('express');
const { signUp, login, logout, checkAuth, updateProfile, getUsers } = require('../controllers/auth.controller');
const { protectRoute, adminOnly } = require('../middleware/auth.middleware');
const { validate } = require('../validators/validator.middleware');
const { validateSignUp, validateLogin } = require('../validators/auth.validator');
const upload = require('../middleware/upload.middleware');

const router = Router();

router.post('/signup', validate(validateSignUp), signUp);
router.post('/login', validate(validateLogin), login);
router.post('/logout', logout);
router.get('/check', protectRoute, checkAuth);
router.put('/updateProfile/:userId', protectRoute, upload.single('profilePic'), updateProfile);

// Admin-only user directory
router.get('/getusers', protectRoute, adminOnly, getUsers);

module.exports = router;
