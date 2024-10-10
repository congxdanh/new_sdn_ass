// authenticate.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Question = require("../models/Question");
const { userInfo } = require("os");
require("dotenv").config();

// Middleware verifyUser() phải được định nghĩa trước (đã có sẵn từ assignment trước)req,ré

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split("")[1];
    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json("token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you are not authenticated");
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id == req.params.id || req.user.admin) {
      next();
    } else {
      res.status(403).json("you are not a admin");
    }
  });
};

const verifyAuthor = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      const err = new Error("Question not found");
      err.status = 404;
      return next(err);
    }

    if (question.author.equals(req.user._id)) {
      return next(); // Người dùng là tác giả, tiếp tục xử lý
    } else {
      const err = new Error("You are not the author of this question");
      err.status = 403;
      return next(err); // Người dùng không phải là tác giả, trả về lỗi
    }
  } catch (err) {
    return next(err);
  }
};

// Middleware verifyUser() để xác thực người dùng từ token
const verifyUser = async (req, res, next) => {
  // Lấy token từ headers (thường là trong header Authorization)
  const token = req.headers.authorization?.split(" ")[1]; // Thường có dạng "Bearer <token>"

  if (!token) {
    const err = new Error("You are not authenticated!");
    err.status = 401;
    return next(err);
  }

  try {
    // Giải mã token để lấy thông tin người dùng
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Thay "your_jwt_secret" bằng secret thực tế của bạn

    // Tìm người dùng từ ID trong token
    const user = await User.findById(decoded._id);
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    // Gán thông tin người dùng vào req.user để các middleware khác có thể sử dụng
    req.user = user;
    next();
  } catch (error) {
    const err = new Error("Invalid token");
    err.status = 401;
    next(err);
  }
};

module.exports = {
  verifyAdmin,
  verifyAuthor,
  verifyUser,
  verifyToken,
};
