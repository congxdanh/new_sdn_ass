const router = require("express").Router();
const quizController = require("../controllers/quizzController");
const questionController = require("../controllers/questionController");
const questionRouter = require("./questionRouter");

router
  .route("/")
  .get(quizController.getAllQuizzes)
  .post(quizController.createQuiz);

router
  .route("/:quizId")
  .get(quizController.getQuiz)
  .patch(quizController.updateQuiz)
  .delete(quizController.deleteQuiz);

router.route("/:quizId/populate").get(quizController.getQuestionsByKeyword);

router.use("/:quizId", questionRouter);

module.exports = router;
