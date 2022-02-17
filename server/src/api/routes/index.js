const { Router } = require("express");
const RecipeRouter = require("./RecipeRoute");
const router = Router();

router.use("/recipes", RecipeRouter);

module.exports = router;
