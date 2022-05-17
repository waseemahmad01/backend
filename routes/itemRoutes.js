const router = require("express").Router();
const {
	getItems,
	createItem,
	updateItem,
	deleteItem,
} = require("../controller/itemController");
const { auth } = require("../middlewares/authMiddleware");

router.route("/").get(getItems).post(auth, createItem);
router.route("/:id").patch(auth, updateItem).delete(auth, deleteItem);

module.exports = router;
