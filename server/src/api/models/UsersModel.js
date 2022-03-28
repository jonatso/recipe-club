const Recipe = require("./RecipeModel");

module.exports = (sequelize, DataTypes) => {
   const Users = sequelize.define("Users", {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      username: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: { isAlphanumeric: true },
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: { isEmail: true },
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      isSuperuser: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false,
      },
   });

   Users.associate = (models) => {
      Users.hasMany(models.Recipe, { as: "creator" });
      Users.belongsToMany(models.Recipe, { through: "save", as: "saver" });
      Users.hasMany(models.Rate, { as: "rating" });
   };

   return Users;
};
