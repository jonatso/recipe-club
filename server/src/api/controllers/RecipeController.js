const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const { Recipe, Users } = require("../models");
const db = require("../models");
const { validateParseInt } = require("../helpers");
const { RecipeValidator } = require("../validations");
const isAuthorized = require("../helpers/isAuthorized");

const getRecipes = async (req, res) => {
   try {
      const recipes = await Recipe.findAll({
         include: [
            {
               model: Users,
               required: true,
               as: "creator",
            },
         ],
         order: [["createdAt", "DESC"]],
      });
      if (recipes === undefined || recipes.length == 0) {
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
         include: [
            {
               model: Users,
               required: true,
               as: "creator",
            },
         ],
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
      console.log(req.body);
      RecipeValidator.validateInput({ ...req.body });
      console.log("---userid---");
      console.log(req.session.userId);
      const recipe = await Recipe.create({ ...req.body });

      const creator = await Users.findOne({ where: { id: req.session.userId } });
      await recipe.setCreator(creator);
      return res.status(201).json(recipe);
   } catch (err) {
      console.log("rip rip");
      return res.status(400).json({ error: err.message });
   }
};

const deleteRecipe = async (req, res) => {
   try {
      const { id } = req.params;
      if (!validateParseInt(id)) {
         throw new Error(`id is not an integer`);
      }
      const recipe = await Recipe.findOne({ where: { id } });
      console.log(recipe);
      await isAuthorized(recipe.creatorId, req.session.userId);
      console.log("is authorized");
      await recipe.destroy();
      return res.status(200).json({ message: "Recipe deleted" });
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
      const recipe = await Recipe.findOne({ where: { id } });
      await isAuthorized(recipe.creatorId, req.session.userId);
      RecipeValidator.validateInput({ ...req.body });
      if (req.body.userId) {
         throw new Error("cannot update userId");
      }
      await Recipe.update({ ...req.body }, { where: { id } });
      return res.status(200).json({ message: "Post updated" });
   } catch (err) {
      return res.status(400).json({ error: err.message });
   }
};

const getSaved = async (req, res) => {
   try {
      const { userId } = req.params;
      if (!validateParseInt(userId)) {
         throw new Error(`userId is not an integer`);
      }

      const recipes = await db.sequelize.query(`SELECT "RecipeId" FROM save WHERE "UserId" = :userId`, {
         replacements: { userId },
         type: Sequelize.QueryTypes.SELECT,
      });

      const saved = await Recipe.findAll({
         where: {
            id: {
               [Sequelize.Op.in]: recipes.map((recipe) => recipe.RecipeId),
            },
         },
      });

      return res.status(200).json(saved);
   } catch (err) {
      return res.status(400).json({ error: err.message });
   }
};

const saveRecipe = async (req, res) => {
   try {
      const { recipeId } = req.params;

      if (!validateParseInt(recipeId)) {
         throw new Error(`recipeId is not an integer`);
      }
      const user = await Users.findOne({ where: { id: req.session.userId } });
      const recipe = await Recipe.findOne({ where: { id: recipeId } });
      await recipe.addSaver(user);
      return res.status(200).json({ message: "Recipe saved" });
   } catch (err) {
      return res.status(400).json({ error: err.message });
   }
};

const deleteSavedRecipe = async (req, res) => {
   try {
      const { recipeId } = req.params;
      if (!validateParseInt(recipeId)) {
         throw new Error(`recipeId is not an integer`);
      }
      const user = await Users.findOne({ where: { id: req.session.userId } });
      const recipe = await Recipe.findOne({ where: { id: recipeId } });
      await recipe.removeSaver(user);
      return res.status(200).json({ message: "Recipe deleted" });
   } catch (err) {
      return res.status(400).json({ error: err.message });
   }
};

const searchRecipe = async (req, res) => {
   try {
      const recipe = await Recipe.findAll({
         where: {
            [Op.or]: [
               {
                  name: {
                     [Op.like]: "%" + req.query.q + "%",
                  },
               },
               {
                  description: {
                     [Op.like]: "%" + req.query.q + "%",
                  },
               },
            ],
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

const getUserRecipes = async (req, res) => {
   console.log("FINDING USER RECIPES")
   const { userId } = req.params;
   try {
      const recipes = await Recipe.findAll({
         where: {
            creatorId: userId,
         },
         include: [
            {
               model: Users,
               required: true,
               as: "creator",
            },
         ],
         order: [["createdAt", "DESC"]],
      });
      if (recipes === undefined || recipes.length == 0) {
         throw new Error("could not find any recipes");
      }
      return res.status(200).json(recipes);
   } catch (err) {
      return res.status(404).json({ error: err.message });
   }
};


module.exports = {
   getRecipes,
   createRecipe,
   getRecipe,
   deleteRecipe,
   updateRecipe,
   getSaved,
   saveRecipe,
   deleteSavedRecipe,
   searchRecipe,
   getUserRecipes,
};
