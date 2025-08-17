const User = require("../models/UserModels");

const dashboard = (req, res) => {
  try {
    res.json({ message: "Welcome Admin" });
  } catch (error) {
    console.log("Error in admin only controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { dashboard };