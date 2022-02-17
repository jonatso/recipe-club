const db = require("../../config/db");
const Recipe = require("../models/Recipe");

const getRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.findAll(
			{attributes: ['id', 'name', 'description', 'picture', 'difficulty', 'createdAt']}
		);
		res.json(recipes);
	} catch (err) {
		console.log("message", err);
	}
};

const getRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findOne({
			where: {
				id: req.params.id,
			},
		});
		res.json(recipe);
	} catch (err) {
		console.log("message", err);
	}
}

const createRecipe = async (req, res) => {
	try {
		const recipeInput = await Recipe.create(
			{
				name: req.body.name,
				description: req.body.description,
				ingredients: req.body.ingredients,
				method: req.body.method,
				picture: req.body.picture,
				difficulty: req.body.difficulty,
			}
		)
		res.sendStatus(201);
	} catch (err) {
		console.log("message", err);
	}
};

module.exports = {
	getRecipes,
	createRecipe,
	getRecipe,
};
