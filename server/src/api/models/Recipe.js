const { DataTypes } = require("sequelize")
const db = require("../../config/db")
const dummyRecipes = require("../../helpers/dummydata")

const Recipe = db.define('Recipe', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ingredients : {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false
    },
    method: {
        type: DataTypes.STRING
    },
    picture: {
        type: DataTypes.STRING
    },
    difficulty: {
        type: DataTypes.STRING
    }
})

const sync = async () => {await db.sync({ force: true });}



sync().then(() => {
    console.log('Database synced, inserting dummy data');
    Recipe.bulkCreate(
		dummyRecipes
	)
});

module.exports = Recipe;