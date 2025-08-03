const  express = require("express");
const router = express.Router();
const { signUp, Login, checkAuth } = require('../Controllers/UserController');
const protectRoute = require("../middleware/auth.middleware");

router.post('/signup', signUp);
router.post('/login', Login);
router.get('/check',protectRoute, checkAuth)

module.exports = router;