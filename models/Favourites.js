const sequelize = require("../db");
const { Sequelize, Model } = require("sequelize"); 


class Favourites extends Model {}


const favouritesSchema = {
    imgId : {
        type: Sequelize.INTEGER,
        allownull: false,
        references: {
            model: "imguploaders",
            key: "id"
        }
    },
    userId : {
        type: Sequelize.INTEGER,
        allownull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}

Favourites.init(favouritesSchema, {
    sequelize,
    tableName: "favourites"
})

module.exports = Favourites