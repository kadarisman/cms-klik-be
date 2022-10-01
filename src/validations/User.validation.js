const joi = require('joi');
const user = require('./../models/UserModel');


//validation for create
const validCreateUser = joi.object({
    fullName     : joi.string().required(),
    mobile       : joi.number().integer().max(15).required(),
    passwordHash : joi.required(),
    email        : joi.required()
});

const validationCreateUser = async (req, res, next) => {
    try {       
        const options = {
            abortEarly  : false,
            allowUnknow : true,
            stripUnknow : true
        };
        const value = await validCreateUser.validate(req.body, options);
        if (value.error){
            res.json({error : value.error.details[0].message});
            return false;
        }
        const email = req.body.email;
        const emailCheck = await user.emailCheck(email);
        if(emailCheck){
            res.status(401).json({message : `Email ${email} Already exit`});
            return false;
        }
        next();
    } catch (error) {
        res.json({error : error});
        
    }
}
//end

//validation for update
const validUpdateUser = joi.object({
    fullName     : joi.string().required(),
    mobile       : joi.number().integer().max(15).required(),
});
const validationUpdateUser = async (req, res, next) => {
    try {

        const options = {
            abortEarly  : false,
            allowUnknow : true,
            stripUnknow : true
        };
        const value = await validUpdateUser.validate(req.body, options);
        if (value.error){
            res.json({error : value.error.details[0].message});
            return false;
        }
        const id = req.params.id;
        const userById = await user.getUserById(id);
        if(!userById){
            res.json({error : `User with ${id} not found`});
            return false;
        }
        next();        
    } catch (error) {
        console.log(error);
        res.status(401).json({error : error});
        
    }
}
//end



module.exports = {
    validationCreateUser,
    validationUpdateUser
}