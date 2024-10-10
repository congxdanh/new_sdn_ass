const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title can not be empty!"],
    unique: true,
  },
  description: String,
  questions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
