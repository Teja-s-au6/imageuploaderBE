const ImgUploader = require('../models/ImgUploader');
const Favourites = require("../models/Favourites");
const cloudinary = require("../utils/cloudinary");
const convertBufferToString = require("../utils/convertBufferToString");

module.exports = {
    async imgupload(req, res) {
        try {
            const user = req.user
            const {title, description, privacy} = req.body
            let imageContent = convertBufferToString(
                req.file.originalname,
                req.file.buffer
              );
            let imageResponse = await cloudinary.uploader.upload(imageContent);
            const imgupload = await ImgUploader.create({ img: imageResponse.secure_url, title, description, privacy,  createdBy: user.id });
            res.status(201).json({status: 201, imgupload: imgupload, createdBy: user._id })
                    
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error')
        }
    },

    async getimgupload(req, res) {
        try {
            const user = req.user;
            const imguploaders  = await ImgUploader.findAll({
                where: {
                    createdBy: user.id
                }
            })

            res.json({imguploaders: imguploaders})
            
        } catch (err) {
            console.log(err);
            res.send('Server Error')
        }
    },

    async allimgupload(req, res) {
        try {
            const user = req.user;
            const imguploaders  = await ImgUploader.findAll({ })

            res.json({imguploaders: imguploaders})
            
        } catch (err) {
            console.log(err);
            res.send('Server Error')
        }
    },

    async addfavourites(req, res) {
        try {
            const user = req.user;
            const id = req.params.id;
            const favourite = await ImgUploader.findOne({
                where: {
                    id : id
                }
            })

            const searchfavourite = await Favourites.findOne({
                where : {
                    userId: user.id
                }
            })
            if(searchfavourite === null) {
                const addfavourites = await Favourites.create({ userId: user.id, imgId: favourite.dataValues.id })
                res.status(201).json({ addfavourites: addfavourites })
            }
            else {
                throw new Error('Already Bookmarked')
            }
            
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error')
        }
    },

    async deletefavourites(req, res) {
        try {
            const user = req.user;
            const id = req.params.id;
            const favourite = await ImgUploader.findOne({
                where: {
                    id : id
                }
            })

            const searchfavourite = await Favourites.destroy({
                where : {
                    userId: user.id,
                    imgId: favourite.dataValues.id
                }
            })
            
            if (searchbookmark === 1) {
                res.send("Favourites Deleted");
            }
        } catch (err) {
            console.log(err.message);
            res.send("Server Error");
        }
    }

    // async updateImgUpload(req, res) {
    //     try {
            
    //     } catch (err) {
            
    //     }
    // }
}