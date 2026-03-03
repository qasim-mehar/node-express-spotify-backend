const mongoose = require("mongoose");
async function connectDB() {
  const URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(URI);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("Database couldnt connect!", error);
  }
}

module.exports = connectDB;
