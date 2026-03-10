const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  //Music which user upload will go on imagekit and we will store it's uri only
  uri: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  //WE WILL STORE THE USER _id from user cluster
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const musicModel = mongoose.model("music", musicSchema);
module.exports = musicModel;
