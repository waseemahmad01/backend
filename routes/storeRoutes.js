const router = require("express").Router();
const {
	getStores,
	createStore,
	getStore,
} = require("../controller/storeController");
const { auth } = require("../middlewares/authMiddleware");

router.route("/").get(getStores).post(auth, createStore);
router.route("/:id").get(getStore);

module.exports = router;
