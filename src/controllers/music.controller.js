const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");

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
    const { title } = req.body;
    const file = req.file;
    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: decoded.id,
    });

    res.status(201).json({
      message: "Music upload successfully",
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Unauthorized",
    });
  }
}

module.exports = { createMusic };
