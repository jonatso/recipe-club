const { Router } = require("express");
const { RecipeController } = require("../controllers");
const { isAuth } = require("../middlewares");

const router = Router();

router.get("/", RecipeController.getRecipes);

router.get("/:id", RecipeController.getRecipe);

router.use("/create", isAuth);
router.post("/create", RecipeController.createRecipe);

router.use("update/:id", isAuth);
router.put("/update/:id", RecipeController.updateRecipe);

router.use("/delete/:id", isAuth);
router.delete("/delete/:id", RecipeController.deleteRecipe);

router.get("/saved/:userId", RecipeController.getSaved);

router.use("/save/:recipeId", isAuth);
router.post("/save/:recipeId", RecipeController.saveRecipe); 

router.use("/deletesaved/:recipeId", isAuth);
router.delete("/deletesaved/:recipeId", RecipeController.deleteSavedRecipe);

module.exports = router;
