const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return res.status(404).json({
			status: "fail",
			message: "invalid email",
		});
	} else {
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(400).json({
				status: "fail",
				message: "invalid password",
			});
		const token = jwt.sign({ id: user._id }, process.env.PUBLICK_KEY);
		res.status(200).send(token);
	}
};

module.exports.updatePassword = async (req, res) => {
	console.log(req.id);
	const user = await User.findById(req.id);
	const validOldPassword = await bcrypt.compare(
		req.body.oldPassword,
		user.password
	);
	if (!validOldPassword)
		return res.status(400).json({
			status: "failed",
			message: "invalid old password",
		});
	const newPassword = await bcrypt.hash(req.body.newPassword, 10);
	const updatedUser = await User.findByIdAndUpdate(
		req.id,
		{ $set: { password: newPassword } },
		{ new: true }
	);
	res.send(updatedUser);
};
