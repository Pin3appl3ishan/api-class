const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authorizedUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing",
      });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;
    const user = await User.findOne({_id: userId});
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = user; // Attach user to request object
    next(); // continue to next middleware or route handler
  } catch (error) {
    console.error("Error in authorizedUser middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication error",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // User is an admin, proceed to the next middleware or route handler
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
    });
  }
}
