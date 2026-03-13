const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");
const authMiddleware = require("../middleware/auth.middleware");

async function createMusic(req, res) {
  const { title } = req.body;
  //getting decoded value from middleware
  const decoded = req.user;
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
}

async function createAlbum(req, res) {
  //Creating an album
  const { title, musics } = req.body;
  //getting decoded value from middleware
  const decoded = req.user;
  const album = await albumModel.create({
    title,
    musics: musics,
    artist: decoded.id,
  });

  res.status(201).json({
    message: "Album created successfully",
    id: album._id,
    title: album.title,
    musics: album.musics,
    artist: album.artist,
  });
}

async function getAllMusics(req, res) {
  const musics = await musicModel
    .find()
    .limit(10)
    .populate("artist", "username email");
  res.status(200).json({
    message: "Musics fetched succesfully",
    musics,
  });
}

async function getAllAlbums(req, res) {
  //select only title and artist and further in artist only username and email
  const album = await albumModel
    .find()
    .select("title artist")
    .populate("artist", "username email");
  res.status(200).json({
    message: "Albums fetched successfully",
    album,
  });
}
async function getAlbumById(req, res) {
  const id = req.params.albumId;
  const album = await albumModel
    .findById(id)
    .populate("artist", "username email");
  res.status(200).json({
    message: "Album fetched successfully",
    album,
  });
}
module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumById,
};
