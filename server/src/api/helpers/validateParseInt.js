const validateParseInt = (id) => {
	if (Number.isInteger(parseInt(id))) {
		return true;
	}
	return false;
};

module.exports = validateParseInt;
