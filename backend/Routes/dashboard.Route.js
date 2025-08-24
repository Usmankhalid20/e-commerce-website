const express = require('express');
const router = express.Router();

const { dashboard, ListingProduct, Product } = require('../Controllers/dashboardController');
const { protectRoute, adminOnly} = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware")

router.get("/dashboard", protectRoute, adminOnly, dashboard);
router.post("/listing", protectRoute, adminOnly, upload.single("image"), ListingProduct);
router.get("/products", protectRoute, adminOnly, Product);

module.exports = router;