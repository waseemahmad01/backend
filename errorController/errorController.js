const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
	const message = `Invalid id ${err.value}`;
	return new AppError(message, 400);
};

const sendError = (error, res) => {
	res.status(error.statusCode).json({
		status: error.status,
		message: error.message,
		err: error,
	});
};

module.exports = (error, req, res, next) => {
	error.statusCode = error.statusCode || 500;
	error.status = error.status || "error";
	let err = { ...error };
	if (err.name === "CastError") err = handleCastErrorDB(err);
	sendError(err, res);
};
