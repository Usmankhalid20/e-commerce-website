const jwt = require('jsonwebtoken');
const User = require('../models/UserModels');

const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        };
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({ msg: 'Invalid token, authorization denied' });
        }
        const user = await User.findById(decoded.userID).select("-password");
        console.log("userID", user);
        if(!user) {
            return res.status(401).json({ msg: 'User not found, authorization denied' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}
const adminOnly = (req, res, next) => {
    if(req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Admin only' });
    }
}
module.exports = { protectRoute, adminOnly };