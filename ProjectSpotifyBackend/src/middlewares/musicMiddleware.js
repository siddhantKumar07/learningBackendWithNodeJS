const jwt = require("jsonwebtoken");

const createMusicMiddleware = (req, res, next) => {
  const { token } = req.cookies || {};
  const musicFile = req.file;
  const { title } = req.body;

  if (!musicFile || !title) {
    return res.status(400).json({
      message: "music file and title are required",
    });
  }
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);

    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "you are not authorized to create music",
      });
    }
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  next();
};

module.exports = createMusicMiddleware;
