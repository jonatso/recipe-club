const validateInput = (body) => {
	if (body.password.length < 3) {
		throw new Error("password is too short");
	}
};

module.exports = { validateInput };
