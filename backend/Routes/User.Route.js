const  express = require("express");
const router = express.Router();
const { signUp, Login, checkAuth, Logout, getUsers, updateProfile } = require('../Controllers/UserController');
const { protectRoute, adminOnly } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.post('/signup', signUp);
router.post('/login', Login);
router.get('/check',protectRoute, checkAuth);
router.put("/updateProfile/:userId", protectRoute, upload.single('avatar'), updateProfile);
// router.get("/getUserUpdateProfile/:userId", protectRoute, getUserUpdateProfile);
router.get("/getusers", protectRoute, adminOnly, getUsers);
router.post("/logout", Logout);

module.exports = router;