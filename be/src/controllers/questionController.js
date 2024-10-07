const Question = require("../models/question");
const Quiz = require("../models/quizz");

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({
      status: "success",
      data: {
        questions,
      },
    });
  } catch {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);
    res.status(200).json({
      status: "success",
      data: {
        question,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    let quiz;
    if (req.params.quizId) {
      quiz = await Quiz.findById(req.params.quizId);
      if (!quiz) {
        throw new Error("Quiz not found");
      }
    }

    const newQuestion = await Question.insertMany(req.body);

    if (quiz) {
      const ids = newQuestion.map((q) => q._id);
      quiz.questions = [...quiz.questions, ...ids];

      await quiz.save();
    }

    res.status(201).json({
      status: "success",
      data: {
        question: newQuestion,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.questionId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        question,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.questionId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
