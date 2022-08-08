const joi = require('joi');
const user = require('../models/UserModel');

const validLogin = joi.object({
    username : joi.required(),
    password : joi.required()
});

const validationLogin = async (req, res, next) => {
    try {
        const options = {
            abortEarly  : false,
            allowUnknow : true,
            stripUnknow : true
        };
        const value = await validLogin.validate(req.body, options);
        if(value.error){
            res.json({error : value.error.detail[0].message});
            return false;
        } 
        const username = await user.Username_check(req.body.username); 
        if(!username){
            res.json({error : 'Username tidak ditemukan'});
            return false;
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({error : error})
    }
}

module.exports = {
    validationLogin,
}