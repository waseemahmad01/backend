const Item = require("../models/itemModel");
const Store = require("../models/storeModel");
const AppError = require("../utils/appError");
module.exports.getItems = async (req, res) => {
	try {
		const items = await Item.find().select("-__v");
		res.status(200).json({
			status: "success",
			results: items.length,
			data: items,
		});
	} catch (err) {
		res.send(err).status(400);
	}
};
module.exports.createItem = async (req, res, next) => {
	try {
		if (!(await Store.findById(req.body.storeId)))
			return next(
				new AppError(`can't find store with id ${req.body.storeId}`, 404)
			);
		const newItem = new Item({
			title: req.body.title,
			desc: req.body.desc,
			sold: req.body.sold,
		});
		const item = await newItem.save();
		const store = await Store.findByIdAndUpdate(
			req.body.storeId,
			{ $push: { items: item } },
			{ new: true }
		)
			.populate("items createdBy", "username email title desc sold")
			.select("-__v");
		res.send(store);
	} catch (err) {
		res.send(err).status(400);
	}
};
module.exports.updateItem = async (req, res, next) => {
	try {
		// console.log(req.params.id);

		const item = await Item.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true, runValidators: true }
		);
		if (!item) return next(new AppError(`invalid product id`, 404));
		res.status(200).json({
			status: "success",
			data: item,
		});
	} catch (err) {
		next(new AppError("something went wrong", 500));
	}
};
module.exports.deleteItem = async (req, res, next) => {
	try {
		const item = await Item.findByIdAndDelete(req.params.id);
		if (!item) return next(new AppError(`invalid product id`, 404));
		res.status(200).json({
			status: "success",
			data: item,
		});
	} catch (err) {
		next();
	}
};
