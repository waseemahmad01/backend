const router = require("express").Router();
const {getUser,getUsers, deleteUser,createUser,updateUser, forgetPassword} = require("../controller/userController");

router.route('/').get(getUsers).post(createUser);
router.route("/forgetpassword").patch(forgetPassword);
router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;