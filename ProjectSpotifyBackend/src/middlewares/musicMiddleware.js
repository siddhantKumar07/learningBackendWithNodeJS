const jwt = require("jsonwebtoken");

const createMusicMiddleware = (req, res, next) => {
  const { token } = req.cookies || {};

  // console.log("token", token);

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("decoded", decoded);

  if (decoded.role !== "artist") {
    return res.status(403).json({
      message: "you are not authorized to create music"
    });
  }

  next();
};

module.exports = createMusicMiddleware;