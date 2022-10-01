const joi = require("joi");

//create
const validCreatePost = joi.object({
    authorId    : joi.number().integer().required(),
    title       : joi.string().required(),
    metaTitle   : joi.string().required(),
    slug        : joi.string().required(),
    content     : joi.string().required()
});

const validationCreatePost = async (req, res, next) => {
    try {
       
        const options = {
            abortEarly  : false,
            allowUnknow : true,
            stripUnknow : true
        };
        const value = await validCreatePost.validate(req.body, options);
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

//update
const validUpdatePost = joi.object({   
    authorId    : joi.number().integer().required(),
    title       : joi.string().required(),
    metaTitle   : joi.string().required(),
    published   : joi.number().required(),
    content     : joi.string().required()
});
const validationUpdatePost = async (req, res, next) => {
    try {

        const options = {
            abortEarly  : false,
            allowUnknow : true,
            stripUnknow : true
        };
        const value = await validUpdatePost.validate(req.body, options);
        if (value.error){
            res.json({error : value.error.details[0].message});
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
    validationCreatePost,
    validationUpdatePost
}