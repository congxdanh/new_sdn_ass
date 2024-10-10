const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });

    //save to db
    const user = await newUser.save();
    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "username is wrong" });
    }
    //so sanh passwaord
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "password is wrong" });
    }
    if (user && match) {
      const token = jwt.sign(
        {
          id: user._id,
          admin: user.admin,
        },
        process.env.SECRET_KEY,
        { expiresIn: "90d" }
      );
      res.status(200).json({
        status: "success",
        data: {
          token,
          user: {
            id: user._id,
            username: user.username,
            admin: user.admin,
          },
        },
      });
    }

    // res.status(200).json({
    //   status: "success",
    //   data: {
    //     token,
    //     user: {
    //       id: user._id,
    //       username: user.username,
    //       admin: user.admin,
    //     },
    //   },
    // });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};
