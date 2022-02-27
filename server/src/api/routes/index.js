const { Router } = require("express");
const RecipeRouter = require("./RecipeRoute");
const UsersRouter = require("./UsersRoute");
const router = Router();

router.use("/recipes", RecipeRouter);
router.use("/", UsersRouter);

module.exports = router;
