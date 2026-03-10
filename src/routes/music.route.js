const musicController = require("../controllers/music.controller");
const express = require("express");
const router = express.Router();
router.post("/CreateMusic", musicController.createMusic);
module.exports = router;
