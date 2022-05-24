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
         type: DataTypes.TEXT,
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
      points: {
         type: DataTypes.DOUBLE,
         allowNull: false,
         defaultValue: 0,
      },
      numberOfRatings: {
         type: DataTypes.INTEGER,
         allowNull: false,
         defaultValue: 0,
      },
   });

   Recipe.associate = (models) => {
      Recipe.belongsTo(models.Users, { as: "creator" });
      Recipe.belongsToMany(models.Users, { through: "save", as: "saver" });
      Recipe.hasMany(models.Rate, { as: "rating" });
   };

   return Recipe;
};
