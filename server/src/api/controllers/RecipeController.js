const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const { Recipe, Users, Rate, sequelize } = require("../models");
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
      await sequelize.transaction(async (t) => {
         try {
            await Rate.destroy({ where: { RecipeId: recipe.id } }, { transaction: t });
            await recipe.destroy({ transaction: t });
         } catch {
            throw new Error("Transaction failed");
         }
      });
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
         include: [
            {
               model: Users,
               required: true,
               as: "creator",
            },
         ],
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
      const { search } = req.params;
      const recipe = await Recipe.findAll({
         where: {
            [Op.or]: [
               {
                  name: {
                     [Op.like]: "%" + search + "%",
                  },
               },
               {
                  description: {
                     [Op.like]: "%" + search + "%",
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

const getRatings = async (req, res) => {
   try {
      const ratings = await Rate.findAll({
         order: [["createdAt", "DESC"]],
         where: {
            RecipeId: req.params.recipeId,
         },
      });
      if (ratings === undefined || ratings.length == 0) {
         throw new Error("could not find any ratings");
      }
      return res.status(200).json(ratings);
   } catch (err) {
      return res.status(404).json({ error: err.message });
   }
};

const getUserRecipes = async (req, res) => {
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

const rateRecipe = async (req, res) => {
   const value = req.body.value;
   const { recipeId } = req.params;
   const { userId } = req.session;
   // Slow but works
   const ratings = await Rate.findAll({ where: { RecipeId: recipeId } });
   let sum = 0;
   for (let i = 0; i < ratings.length; i++) {
      console.log(ratings[i].value);
      sum += ratings[i].value;
   }
   // A user can rate same recipe twice, no update so far.
   try {
      const newRating = await sequelize.transaction(async (t) => {
         try {
            const rater = await Users.findOne({ where: { id: userId }, transaction: t });
            const newRating = await Rate.create(
               {
                  UserId: userId,
                  RecipeId: recipeId,
                  value: value,
                  comment: req.body.comment,
                  username: rater.username,
               },
               { transaction: t }
            );
            // await newRating.setRater(rater, { transaction: t });
            // const recipe = await Recipe.findOne({ where: { id: recipeId }, transaction: t });
            // await newRating.setRecipe(recipe, { transaction: t });
            sum += parseInt(value);
            const realValue = sum / (ratings.length + 1);
            await Recipe.update(
               { points: realValue, numberOfRatings: ratings.length + 1 },
               { where: { id: recipeId }, transaction: t }
            );
            return newRating;
         } catch {
            throw new Error("Transaction failed");
         }
      });
      return res.status(200).json(newRating);
   } catch (err) {
      return res.status(400).json({ error: err.message });
   }
};

const deleteRating = async (req, res) => {
   const { ratingId } = req.params;
   const { userId } = req.session;

   // A user can rate same recipe twice, no update so far.
   try {
      await sequelize.transaction(async (t) => {
         try {
            const rating = await Rate.findOne({ where: { id: ratingId }, transaction: t });
            // Slow but works
            const ratings = await Rate.findAll({ where: { RecipeId: rating.RecipeId }, transaction: t });
            let sum = 0;
            for (let i = 0; i < ratings.length; i++) {
               sum += ratings[i].value;
            }
            sum -= rating.value;
            const realValue = sum / (ratings.length - 1);
            await Recipe.update(
               { points: realValue, numberOfRatings: ratings.length - 1 },
               { where: { id: rating.RecipeId }, transaction: t }
            );
            await rating.destroy({ where: { id: ratingId }, transaction: t });
            return true;
         } catch (err) {
            console.log(err);
            throw new Error("Transaction failed");
         }
      });
      return res.status(200).json({ message: "Raiting deleted" });
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
   getSaved,
   saveRecipe,
   deleteSavedRecipe,
   searchRecipe,
   rateRecipe,
   getRatings,
   deleteRating,
   getUserRecipes,
};
