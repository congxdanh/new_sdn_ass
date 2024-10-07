const mongoose = require("mongoose");

const questionModel = new mongoose.Schema({
  text: {
    type: String,
    unique: true,
    required: [true, "Question content can not be empty!"],
  },
  options: [
    {
      type: String,
      required: [true, "Question's option can not be empty!"],
    },
  ],
  keywords: [String],
  correctAnswerIndex: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.options.length && val >= 0;
      },
      message: "Correct answer index can not be larger than options length",
    },
  },
});

const Question = mongoose.model("Question", questionModel);

module.exports = Question;
