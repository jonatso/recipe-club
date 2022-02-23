const { Recipe } = require("../models");
const { validateParseInt } = require("../helpers");
const { RecipeValidator } = require("../validations");

const getRecipes = async (req, res) => {
   try {
      const recipes = await Recipe.findAll({ order: [["createdAt", "DESC"]] });
      console.log(recipes);
      if (recipes === undefined || recipes.length === 0) {
         throw new Error("could not find any recipes");
      }
      return res.status(200).json(recipes);
   } catch (err) {
      return res.status(404).json({ error: err.message });
   }
};

const getRecipe = async (req, res) => {
   try {
      const { id } = req.params;
      if (!validateParseInt(id)) {
         throw new Error(`id is not an integer`);
      }
      const recipe = await Recipe.findOne({
         where: {
            id,
         },
      });
      if (!recipe) {
         throw new Error("no recipe with that id found");
      }
      return res.status(200).json(recipe);
   } catch (err) {
      return res.status(404).json({ error: err.message });
   }
};

const createRecipe = async (req, res) => {
   try {
      RecipeValidator.validateInput({ ...req.body });
      const recipe = await Recipe.create({ ...req.body });
      return res.status(201).json(recipe);
   } catch (err) {
      return res.status(400).json({ error: err.message });
   }
};

const deleteRecipe = async (req, res) => {
   try {
      const { id } = req.params;
      if (!validateParseInt(id)) {
         throw new Error(`id is not an integer`);
      }
      await Recipe.destroy({
         where: {
            id,
         },
      });
      return res.status(200).json({ message: "Post deleted" });
   } catch (err) {
      return res.status(400).json({ error: err.message });
   }
};

const updateRecipe = async (req, res) => {
   try {
      const { id } = req.params;
      if (!validateParseInt(id)) {
         throw new Error(`id is not an integer`);
      }
      RecipeValidator.validateInput({ ...req.body });
      await Recipe.update({ ...req.body }, { where: { id } });
      return res.status(200).json({ message: "Post updated" });
   } catch (err) {
      return res.status(400).json({ error: err.message });
   }
};

module.exports = {
   getRecipes,
   createRecipe,
   getRecipe,
   deleteRecipe,
   updateRecipe,
};
