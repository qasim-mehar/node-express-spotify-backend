const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
async function registerUser(req, res) {
  const { username, email, password, role = "user" } = req.body;

  const isUserAlreayExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreayExist) {
    return res.status(409).json({
      message: "User already exist",
    });
  }
  //10 is the salt, which is use for random value
  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hash,
    role,
  });

  //PASS AT LEAST  A UNIQUE DATA IN SIGN FUNCTION
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    },
  });
}

module.exports = { registerUser };
