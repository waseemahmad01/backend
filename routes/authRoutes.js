const router = require("express").Router();
const { login, updatePassword } = require("../controller/authController");
const { auth } = require("../middlewares/authMiddleware");

router.route("/").post(login);
router.route("/updatepassword").patch(auth, updatePassword);

module.exports = router;
