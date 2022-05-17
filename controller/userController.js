const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const transporter = require("../nodemailerConfig");

module.exports.getUsers = async (req, res) => {
	try {
		const users = await User.find({}).select("-password -__v");
		res.status(200).json({
			status: "success",
			results: users.length,
			data: users,
		});
	} catch (err) {
		console.log(err.msg);
	}
};

module.exports.getUser = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id }).select(
			"-password -__v"
		);
		if (!user) {
			return res.status(404).send("user not found with this id");
		}
		res.status(200).json({
			status: "success",
			data: user,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: `Can't find user with id ${req.params.id}`,
		});
	}
};

module.exports.createUser = async (req, res) => {
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10);
		const newUser = new User({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			username: req.body.username,
			email: req.body.email,
			password: newPassword,
		});
		const user = await newUser.save();
		res.send(user);
	} catch (err) {
		console.log(err);
		res.status(400).send(`${Object.keys(err.keyValue)[0]} already exist!`);
	}
};

module.exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).send("user not found with this id");
		}
		res.status(200).send("user removed successfully");
	} catch (err) {
		console.log(err.message);
	}
};

module.exports.updateUser = async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		if (!updatedUser) {
			return res.status(404).send("User not found with this id");
		}
		res.send(updatedUser);
	} catch (err) {
		console.log(err.message);
	}
};

module.exports.forgetPassword = async (req, res) => {
	try {
		const email = req.body.email;
		let newPassword = Math.floor(Math.random() * 90000000) + 10000000;
		newPassword = newPassword.toString();
		transporter.sendMail(
			{
				from: "wa031522@gmail.com",
				to: email,
				subject: "Password Reset",
				text: newPassword,
			},
			async (err, info) => {
				if (err) {
					console.log(err);
					res.send("something went wrong");
				} else {
					console.log(info);
					newPassword = await bcrypt.hash(newPassword, 10);
					const user = await User.findOneAndUpdate(
						{ email: req.body.email },
						{ $set: { password: newPassword } },
						{ new: true }
					);
					res.status(200).send(user);
				}
			}
		);
	} catch (err) {
		res.status(400).send("something went wrong");
	}
};
