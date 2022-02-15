const db = require("../../config/db");
const Recipe = require("../models/Recipe");

const getRecipes = async (req, res) => {
	try {
		const data = await db.query("SELECT * FROM \"Recipes\"");
		res.send(200).json(data);
	} catch (err) {
		console.log("message", err);
	}
};

const createRecipe = async (req, res) => {
	console.log(req)
	try {
		// const recipeInput = await db.query(
		// 	"INSERT INTO \"Recipes\" (name, description, ingredients, method) values (\"test\", \"test\", \"test\", \"test\")"
		// 	// [
		// 	// 	req.body.name,
		// 	// 	req.body.description,
		// 	// 	req.body.ingredients,
		// 	// 	req.body.method,
		// 	// ]
		// );
		const recipeInput = await Recipe.create(
			{
				name: req.body.name,
				description: req.body.description,
				ingredients: req.body.ingredients,
				method: req.body.method,
			}
		)
		res.send(201).json(data);
	} catch (err) {
		console.log("message", err);
	}
};

module.exports = {
	getRecipes,
	createRecipe,
};
