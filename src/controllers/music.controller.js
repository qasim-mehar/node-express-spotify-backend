const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
async function createMusic(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    //IT WILL RETURN VALUES WHICH WE PUT IN TOKEN WHILE AUTHENTICATION, USER _id AND ROLE IN THIS SITUATION
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "Only artist can create music",
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
}
module.exports = { createMusic };
