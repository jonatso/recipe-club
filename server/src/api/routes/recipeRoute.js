const { Router } = require("express");
const { recipeController } = require("../controllers");

const router = Router();

router.get("/recipe", recipeController.getRecipes);

router.post("/recipe", recipeController.createRecipe);

router.put("/recipe", (req, res) => {
	res.send({ message: "Recipe updated" });
});

router.delete("/recipe", (req, res) => {
	res.send({ message: "Recipie deleted" });
});

module.exports = router;
