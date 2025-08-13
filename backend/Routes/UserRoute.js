const  express = require("express");
const router = express.Router();
const { signUp, Login, checkAuth, dashboard, Logout } = require('../Controllers/UserController');
const { protectRoute, adminOnly} = require("../middleware/auth.middleware");

router.post('/signup', signUp);
router.post('/login', Login);
router.get('/check',protectRoute, checkAuth);
router.get("/dashboard", protectRoute, adminOnly, dashboard);
router.post("/logout", Logout);

module.exports = router;