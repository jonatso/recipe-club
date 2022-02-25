const { Users } = require("../models");
const { validateParseInt } = require("../helpers");
const { UsersValidator } = require("../validations");
const argon2 = require("argon2");

const getUsers = async (req, res) => {
	try {
		const users = await Users.findAll({ order: [["createdAt", "DESC"]] });
		if (users === undefined || users.length == 0) {
			throw new Error("could not find any users");
		}
		return res.status(200).json(users);
	} catch (err) {
		return res.status(404).json({ error: err.message });
	}
};

const getUser = async (req, res) => {
	try {
		const id = req.params.id;
		if (!validateParseInt(id)) {
			throw new Error(`id is not an integer`);
		}
		const user = await Users.findOne({
			where: {
				id,
			},
		});
		if (!user) {
			throw new Error("no user with that id found");
		}
		return res.status(200).json(user);
	} catch (err) {
		return res.status(404).json({ error: err.message });
	}
};

const register = async (req, res) => {
	try {
		UsersValidator.validateInput({ ...req.body });
		const hash = await argon2.hash(req.body.password);
		const user = await Users.create({
			username: req.body.username,
			email: req.body.email,
			password: hash,
		});
		return res.status(201).json(user);
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const id = req.params.id;
		if (!validateParseInt(id)) {
			throw new Error(`id is not an integer`);
		}
		await Users.destroy({
			where: {
				id,
			},
		});
		return res.status(200).json({ message: "User deleted" });
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const id = req.params.id;
		if (!validateParseInt(id)) {
			throw new Error(`id is not an integer`);
		}
		UsersValidator.validateInput({ ...req.body });
		const hashPassword = await argon2.hash(req.body.password);
		await Users.update(
			{
				username: req.body.username,
				email: req.body.email,
				password: hashPassword,
			},
			{ where: { id } }
		);
		return res.status(200).json({ message: "User updated" });
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

const loginUser = async (req, res) => {
	try {
		const user = await Users.findOne(
			req.body.usernameOrEmail.includes("@")
				? { where: { email: usernameOrEmail } }
				: { where: { username: usernameOrEmail } }
		);

		if (!user) {
			throw new Error("That user does not exist");
		}

		const valid = await argon2.verify(user.password, req.body.password);
		if (!valid) {
			throw new Error("Incorrect password");
		}

		req.session.userID = user.id;
		return res.status(200).json(user);
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

// useful to check which user is logged in, not a route so might move it
const me = async (req, res) => {
	if (!req.session.userID) {
		return undefined;
	}
	const user = await Users.findOne(req.session.userID);
	return user;
};

module.exports = {
	getUsers,
	register,
	getUser,
	deleteUser,
	updateUser,
	loginUser,
	me,
};
