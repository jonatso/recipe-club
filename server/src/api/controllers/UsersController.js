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

const createUser = async (req, res) => {
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

module.exports = {
	getUsers,
	createUser,
	getUser,
	deleteUser,
	updateUser,
};
