const musicController = require("../controllers/music.controller");
const multer = require("multer");
const express = require("express");
const upload = multer({
  storage: multer.memoryStorage(),
});
const router = express.Router();
router.post("/new", upload.single("music"), musicController.createMusic);
module.exports = router;
