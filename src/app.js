const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
module.exports = app;
