const { Recipe, Users } = require("../models");

module.exports = (sequelize, DataTypes) => {
   const Rate = sequelize.define("Rate", {
      value: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      comment: {
         type: DataTypes.TEXT,
      },
      username: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   });

   Rate.associate = (models) => {
      Rate.belongsTo(models.Recipe, { as: "recipe" }, { onDelete: "CASCADE" });
      Rate.belongsTo(models.Users, { as: "user" }, { onDelete: "CASCADE" });
   };

   return Rate;
};
