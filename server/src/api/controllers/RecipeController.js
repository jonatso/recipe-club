const { Recipe } = require("../models");
const { validateParseInt } = require("../helpers");
const { RecipeValidator } = require("../validations");

const getRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.findAll({ order: [["createdAt", "DESC"]] });
		res.json(recipes);
	} catch (err) {
		res.json({ error: err.message });
	}
};

const getRecipe = async (req, res) => {
	try {
		const id = req.params.id;
		if (!validateParseInt(id)) {
			throw new Error(`id is not an integer`);
		}
		const recipe = await Recipe.findOne({
			where: {
				id,
			},
		});
		res.json(recipe);
	} catch (err) {
		res.json({ error: err.message });
	}
};

const createRecipe = async (req, res) => {
	try {
		RecipeValidator.validateInput({ ...req.body });
		const recipe = await Recipe.create({ ...req.body });
		res.json(recipe);
	} catch (err) {
		res.json({ error: err.message });
	}
};

const deleteRecipe = async (req, res) => {
	try {
		const id = req.params.id;
		if (!validateParseInt(id)) {
			throw new Error(`id is not an integer`);
		}
		await Recipe.destroy({
			where: {
				id,
			},
		});
		res.json({ message: "Post deleted" });
	} catch (err) {
		res.json({ error: err.message });
	}
};

const updateRecipe = async (req, res) => {
	try {
		const id = req.params.id;
		if (!validateParseInt(id)) {
			throw new Error(`id is not an integer`);
		}
		RecipeValidator.validateInput({ ...req.body });
		await Recipe.update({ ...req.body }, { where: { id } });
		res.json({ message: "Post updated" });
	} catch (err) {
		res.json({ error: err.message });
	}
};

module.exports = {
	getRecipes,
	createRecipe,
	getRecipe,
	deleteRecipe,
	updateRecipe,
};
