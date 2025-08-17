const  express = require("express");
const router = express.Router();
const { signUp, Login, checkAuth, Logout, getUsers } = require('../Controllers/UserController');
const { protectRoute, adminOnly } = require("../middleware/auth.middleware");

router.post('/signup', signUp);
router.post('/login', Login);
router.get('/check',protectRoute, checkAuth);
router.get("/getusers", protectRoute, getUsers);
router.post("/logout", Logout);

module.exports = router;