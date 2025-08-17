const jwt = require('jsonwebtoken');
const User = require('../models/UserModels');

// const protectRoute = async(req, res, next) => {
//     try {
//         const token = req.cookies.jwt;
//         if(!token) {
//             return res.status(401).json({ msg: 'No token, authorization denied' });
//         };
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if(!decoded){
//             return res.status(401).json({ msg: 'Invalid token, authorization denied' });
//         }
//         const user = await User.findById(decoded.userID).select("-password");
//         console.log("userID", user);
//         if(!user) {
//             return res.status(401).json({ msg: 'User not found, authorization denied' });
//         }
//         req.user = user;
//         next();
//     } catch (error) {
//         console.log("Error in protectRoute middleware: ", error.message);
//         res.status(500).json({message: "Internal server error"});
//     }
// }
const protectRoute = async (req, res, next) => {
  try {
    // Check token from cookies OR Authorization header
    let token = req.cookies.jwt;

    if (!token && req.headers.authorization) {
      if (req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]; // Extract token from header
      }
    }

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ msg: "Invalid token, authorization denied" });
    }

    // Find user
    const user = await User.findById(decoded.userID).select("-password");
    if (!user) {
      return res.status(401).json({ msg: "User not found, authorization denied" });
    }

    req.user = user;
    next();
  } catch (error) {
     console.error("Error in protectRoute middleware:", error); // 👈 log full error
    res.status(500).json({ message: "Internal server error" });
  }
};

const adminOnly = (req, res, next) => {
    if(req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Admin only' });
    }
}
module.exports = { protectRoute, adminOnly };