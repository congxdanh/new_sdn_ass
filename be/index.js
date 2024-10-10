const express = require("express");
const quizzesRouter = require("./src/routes/quizzRouter");
const questionsRouter = require("./src/routes/questionRouter");
const userRouter = require("./src/routes/userRouter");
const connectDB = require("./src/config/connectDB");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Kết nối tới MongoDB
connectDB();

// Middleware để sử dụng CORS
app.use(cors());
app.use(cookieParser());
app.options(
  "*",
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Middleware để parse JSON
app.use(express.json());

// Định nghĩa các route chính
app.use("/quizzes", quizzesRouter);
app.use("/questions", questionsRouter);
app.use("/auth", userRouter);

// Route mặc định
app.use("/", (req, res) => {
  res.send("Welcome to Question Bank Management");
});

// Lắng nghe trên cổng 3001
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
