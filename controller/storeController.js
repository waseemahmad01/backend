const jwt = require("jsonwebtoken");
const Store = require("../models/storeModel");
const AppError = require("../utils/appError");

module.exports.getStores = async (req, res) => {
	try {
		const stores = await Store.find({})
			.populate("createdBy", "username email")
			.select("-__v");
		res.status(200).json({
			status: "success",
			results: stores.length,
			data: stores,
		});
	} catch (err) {
		res.status(404).send(err);
	}
};
const asyncCatch = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch(next);
	};
};
module.exports.createStore = asyncCatch(async (req, res, next) => {
	const newStore = new Store({
		title: req.body.title,
		description: req.body.description,
		catagory: req.body.catagory,
		createdBy: req.body.createdBy,
	});
	const store = await newStore.save();
	res.send(store);
});

module.exports.getStore = asyncCatch(async (req, res, next) => {
	const store = await Store.findById(req.params.id)
		.populate("createdBy", "username email")
		.select("-__v");
	if (!store) {
		return next(new AppError(`can't find store with id ${req.params.id}`, 404));
	}
	res.status(200).json({
		status: "success",
		data: store,
	});
});
