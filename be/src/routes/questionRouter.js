const router = require("express").Router({ mergeParams: true });
const questionController = require("../controllers/questionController");

router
  .route("/")
  .get(questionController.getAllQuestions)
  .post(questionController.createQuestion);

router
  .route("/:questionId")
  .get(questionController.getQuestion)
  .patch(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);

router.route("/question").post(questionController.createQuestion);
router.route("/questions").post(questionController.createQuestion);

module.exports = router;
