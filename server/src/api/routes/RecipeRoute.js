const { Router } = require("express");
const { RecipeController } = require("../controllers");

const router = Router();

router.get("/", RecipeController.getRecipes);

router.get("/:id", RecipeController.getRecipe);

router.post("/create", RecipeController.createRecipe);

router.put("/update/:id", RecipeController.updateRecipe);

router.delete("/delete/:id", RecipeController.deleteRecipe);

module.exports = router;
