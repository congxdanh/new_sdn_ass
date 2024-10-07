const Quiz = require("../models/quizz");

exports.getAllQuizzes = async (req, res) => {
  try {
    console.log("req.params.quizId", req.params);
    const quizzes = await Quiz.find();
    res.status(200).json({
      status: "success",
      data: {
        quizzes,
      },
    });
  } catch {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    res.status(200).json({
      status: "success",
      data: {
        quiz,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getQuestionsByKeyword = async (req, res) => {
  try {
    const keyword = req.query?.keyword || "capital";
    const quiz = await Quiz.findById(req.params.quizId).populate({
      path: "questions",
      match: {
        text: { $regex: `${keyword}`, $options: "i" },
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        quiz,
      },
    });
  } catch {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newQuiz = await Quiz.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        quiz: newQuiz,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.quizId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        quiz,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.quizId);

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
