const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "A product must have a title"],
	},
	desc: {
		type: String,
		required: [true, "A product must have a description"],
	},
	sold: {
		type: Number,
	},
});

module.exports = mongoose.model("Item", itemSchema);
