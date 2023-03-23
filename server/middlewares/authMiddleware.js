const jwt = require("jsonwebtoken");
const { User } = require("../models/User.model");

const authMiddleware = async (req, res, next) => {
  if (!req.headers["auth-token"]) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = req.headers["auth-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
