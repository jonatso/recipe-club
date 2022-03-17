const { Router } = require("express");
const { RecipeController } = require("../controllers");
const { isAuth } = require("../middlewares");

const router = Router();

router.get("/search/:search", RecipeController.searchRecipe);

router.get("/", RecipeController.getRecipes);

router.get("/:id", RecipeController.getRecipe);

router.use("/create", isAuth);
router.post("/create", RecipeController.createRecipe);

router.use("update/:id", isAuth);
router.put("/update/:id", RecipeController.updateRecipe);

router.use("/delete/:id", isAuth);
router.delete("/delete/:id", RecipeController.deleteRecipe);

module.exports = router;
