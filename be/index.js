const express = require("express");
const quizzesRouter = require("./src/routes/quizzRouter");
const questionsRouter = require("./src/routes/questionRouter");
const connectDB = require("./src/config/connectDB");
const app = express();
require("dotenv").config();

const cors = require("cors");

app.use(
  cors({
    // origin: "http://localhost:3001", // Cho phép từ domain cụ thể của bạn
    // credentials: true, // Cho phép gửi thông tin xác thực (nếu cần)
  })
);
app.options("*", cors());

app.use(express.json());
connectDB();

app.use("/quizzes", quizzesRouter);
app.use("/questions", questionsRouter);

app.use("/", (req, res) => {
  res.send("Welcome to Question Bank Management");
});
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
