const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { verify } = require("jsonwebtoken");


module.exports = {
    async userRegister(req, res) {
        try {
            const { name, email, password } = req.body;
            console.log(name, email, password)
            if(!name || !email || !password) {
                return res.status(400).send({ statusCode: 400, message: "Bad request"});
            }
            const createUser = await User.create({name, email, password});
            await createUser.generateAuthToken();
            res.status(201).json({
                statusCode:201,
                createUser,
                expiresIn: "24h"
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error')
        }
    },

    async userLogin(req, res) {
        try {
            const { email, password } = req.body;
            if(!email || !password) return res.status(400).json({statusCode:400, message: 'Invalid Credentials'});
            const user = await User.findByEmailAndPassword(email, password);
            if(user.verified === false) {
                return res.json({message: "Please verify your email first"});
            }else {
                const accessToken = await user.regenerateAuthToken();
                res.status(200).json({
                    statusCode:200,
                    user,
                    accessToken: accessToken,
                    expiresIn: "24h"
                });
            }
            
        } catch (err) {
            if(err.name === 'AuthError'){
                res.json({message: err.message})
            }
        }
    },

    async userLogout (req, res) {
        try {
            const token = req.params.token
            const user = await User.nullifyToken(token);
            res.json({user, message: 'Logout successfully'});
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
}