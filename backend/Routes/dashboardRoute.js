const  express = require("express");
const router = express.Router();
const { dashboard } = require('../Controllers/dashboardController');
const { protectRoute, adminOnly} = require("../middleware/auth.middleware");


router.get("/dashboard", protectRoute, adminOnly, dashboard);

module.exports = router;