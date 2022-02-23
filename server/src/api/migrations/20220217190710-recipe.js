module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("recipe", {
         id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
         },
         description: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
         },
         ingredients: {
            type: Sequelize.DataTypes.ARRAY(DataTypes.JSON),
            allowNull: false,
         },
         method: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
         },
         picture: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
         },
         difficulty: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
         },
      });
   },

   async down(queryInterface, Sequelize) {},
};
