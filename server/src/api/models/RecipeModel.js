const Users = require("./UsersModel");

module.exports = (sequelize, DataTypes) => {
   const Recipe = sequelize.define("Recipe", {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      description: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      ingredients: {
         type: DataTypes.ARRAY(DataTypes.JSON),
         allowNull: false,
      },
      method: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      picture: {
         // Path to picture
         // In the first sprint this will be a url
         type: DataTypes.STRING,
         allowNull: false,
      },
      difficulty: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      time: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   });

   Recipe.associate = (models) => {
      // Recipe.belongsTo(models.Users);
      Recipe.belongsTo(models.Users, { as: "creator" });
   };

   return Recipe;
};
