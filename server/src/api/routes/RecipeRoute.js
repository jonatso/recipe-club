const { Router } = require("express");
const { RecipeController } = require("../controllers");
const { isAuth } = require("../middlewares");

const router = Router();

router.get("/search", RecipeController.searchRecipe);

router.get("/", RecipeController.getRecipes);

router.get("/:id", RecipeController.getRecipe);

router.use("/create", isAuth);
router.post("/create", RecipeController.createRecipe);

router.use("update/:id", isAuth);
router.put("/update/:id", RecipeController.updateRecipe);

router.use("/delete/:id", isAuth);
router.delete("/delete/:id", RecipeController.deleteRecipe);

router.use("/saved/:userId", RecipeController.getSaved);

router.use("/save/:recipeId", isAuth);
router.use("/save/:recipeId", RecipeController.saveRecipe);

router.use("/deletesaved/:recipeId", isAuth);
router.use("/deletesaved/:recipeId", RecipeController.deleteSavedRecipe);

router.use("/rate/:recipeId", isAuth);
router.post("/rate/:recipeId", RecipeController.rateRecipe);

router.get("/ratings/:recipeId", RecipeController.getRatings);

router.use("/deleteRate/:ratingId", isAuth);
router.delete("/deleteRate/:ratingId", RecipeController.deleteRating);

router.get("/user/:userId", RecipeController.getUserRecipes);

module.exports = router;
