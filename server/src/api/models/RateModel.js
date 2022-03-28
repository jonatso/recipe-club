const { Recipe, Users } = require("../models");

module.exports = (sequelize, DataTypes) => {
   const Rate = sequelize.define("Rate", {
      value: {
         type: DataTypes.INTEGER,
      },
      comment: {
         type: DataTypes.TEXT,
      },
   });

   Rate.associate = (models) => {
      Rate.belongsTo(models.Recipe, { as: "recipe" }, { onDelete: "CASCADE" });
      Rate.belongsTo(models.Users, { as: "user" }, { onDelete: "CASCADE" });
   };

   return Rate;
};
