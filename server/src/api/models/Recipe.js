const { DataTypes } = require("sequelize")
const db = require("../../config/db")

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
    }
})


const sync = async () => {await db.sync({ force: true });}
sync()

module.exports = Recipe;