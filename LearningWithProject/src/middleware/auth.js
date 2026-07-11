const jwt = require("jsonwebtoken");
const userModel = require("../model/user");
require("dotenv").config();

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ message: "unauthorized access" });
    }

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized access" });
  }
};

const signupAuth=async (req, res, next) => {
  try {
    const data = req.body;
    const existingUser = await userModel.findOne({ emailId: data.emailId });
    if (existingUser) {
      res.status(400).json({
        message: "user with this email already exist",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = { userAuth ,signupAuth };