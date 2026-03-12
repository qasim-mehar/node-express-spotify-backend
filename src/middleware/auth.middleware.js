const jwt = require("jsonwebtoken");
async function authArtist(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "You don't have access",
      });
    }
    //asign decoded values to req.user so that we can access decoded.id in controllers
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
}

module.exports = { authArtist };
