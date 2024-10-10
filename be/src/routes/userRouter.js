const router = require("express").Router();
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");

// Endpoint cho /users - chỉ cho phép admin truy cập
router
  .route("/")
  .get(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    userController.getAllUsers
  );

// Endpoint cho /users/login - cho phép bất kỳ người dùng nào đăng nhập
router.post("/register", userController.registerUser);
router.post("/login", userController.login);

module.exports = router;
