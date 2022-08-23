const joi = require('joi');
const dosen = require('./../models/UserModel');


//validation for create
const validCreateUser = joi.object({
    username     : joi.string().max(15).required(),
    password     : joi.required(),
    role         : joi.string().valid('admin', 'superadmin').required()
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
        next();
    } catch (error) {
        res.json({error : error});
        
    }
}
//end

//validation for update
const validUpdateUser = joi.object({
    username     : joi.string().max(15).required(),
    password     : joi.required(),
    role         : joi.string().valid('admin', 'superadmin').required()
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
        const id_user = await user.getIdExit(req.params.id_user);
        if(!id_user){
            res.json({error : 'Id User tidak ada'});
            return false;
        }
        next();        
    } catch (error) {
        console.log(error);
        res.status(401).json({error : error});
        
    }
}
//end

//validation for delete
const validationDeleteUser = async (req, res, next) => {
    try {
        const id_user = await user.getIdExit(req.params.id_user);
        if(!id_user){
            res.json({error : 'Id User tidak ada'});
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
    validationDeleteUser,
    validationUpdateUser
}