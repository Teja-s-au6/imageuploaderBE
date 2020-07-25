const sequelize = require("../db");
const { Sequelize, Model } = require("sequelize");  

class ImgUploader extends Model {}

const imguploadSchema = ({
    img : {
        type: Sequelize.TEXT,
        allownull: false
    },
    title: {
        type: Sequelize.TEXT,
        allownull: false
    },
    description: {
        type: Sequelize.TEXT,
        allownull: false
    },
    privacy: {
        type: Sequelize.TEXT,
        allownull: false
    },
    createdBy: {
        type: Sequelize.INTEGER,
        allownull: false,
        references: {
            model: "users",
            key: "id"
        }
    }
})


ImgUploader.init(imguploadSchema, {
    sequelize,
    tableName: "imguploaders"
})

module.exports = ImgUploader;
