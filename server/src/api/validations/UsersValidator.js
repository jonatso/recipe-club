const emailValidator = require("email-validator");
const isAlphanumeric = require("is-alphanumeric");

const validateInput = (body) => {
	if (!isAlphanumeric(body.username)) {
		throw new Error("Username must be alphanumeric");
	}
	if (!emailValidator.validate(body.email)) {
		throw new Error("email is not on correct format");
	}

	if (body.password == undefined || body.password.length < 3) {
		throw new Error("password is too short");
	}
};

module.exports = { validateInput };
