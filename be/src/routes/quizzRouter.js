const router = require("express").Router();
const quizController = require("../controllers/quizzController");
const questionRouter = require("./questionRouter");
const authenticate = require("../middleware/authenticate");

// Kiểm tra các hàm import để chắc chắn rằng chúng không phải là undefined
console.log(quizController);

router
  .route("/")
  .get(authenticate.verifyUser, quizController.getAllQuizzes) // Allow any authenticated user to view quizzes
  .post(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    quizController.createQuiz
  ); // Only admin can create

router
  .route("/:quizId")
  .get(authenticate.verifyUser, quizController.getQuiz) // Allow any authenticated user to view a specific quiz
  .patch(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    quizController.updateQuiz
  ) // Only admin can update
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    quizController.deleteQuiz
  ); // Only admin can delete

router
  .route("/:quizId/populate")
  .get(authenticate.verifyUser, quizController.getQuestionsByKeyword); // Allow any authenticated user

// Apply questionRouter for nested routes, only after verifying the user
router.use("/:quizId", authenticate.verifyUser, questionRouter);

module.exports = router;
