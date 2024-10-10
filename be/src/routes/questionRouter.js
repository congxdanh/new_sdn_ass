const router = require("express").Router({ mergeParams: true });
const questionController = require("../controllers/questionController");
const authenticate = require("../middleware/authenticate");

// Kiểm tra lại để đảm bảo các hàm được import đúng
console.log(questionController);

router
  .route("/")
  .get(authenticate.verifyUser, questionController.getAllQuestions) // Allow any authenticated user
  .post(authenticate.verifyUser, questionController.createQuestion); // Any authenticated user can create

router
  .route("/:questionId")
  .get(authenticate.verifyUser, questionController.getQuestion) // Allow any authenticated user
  .patch(
    authenticate.verifyAdmin,
    authenticate.verifyAuthor,
    questionController.updateQuestion
  ) // Only author can update
  .delete(
    authenticate.verifyAdmin,
    authenticate.verifyAuthor,
    questionController.deleteQuestion
  ); // Only author can delete

module.exports = router;
