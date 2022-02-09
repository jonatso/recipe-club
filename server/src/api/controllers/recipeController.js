const db = require("../../config/db");

const getRecipes = async (req, res) => {
	try {
		const data = await db.query("SELECT * FROM recipes");
		res.send(200).json(data);
	} catch (err) {
		console.log("message", err);
	}
};

const createRecipe = async (req, res) => {
	try {
		const recipeInput = await db.query(
			"INSERT INTO recipes (name, description, ingredients, method) values ($1, $2, $3)",
			[
				req.body.name,
				req.body.description,
				req.body.ingredients,
				req.body.method,
			]
		);
		res.send(201).json(data);
	} catch (err) {
		console.log("message", err);
	}
};

module.exports = {
	getRecipes,
	createRecipe,
};
