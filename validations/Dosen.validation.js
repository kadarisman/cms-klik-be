const joi = require("joi");
const dosen = require('./../models/DosenModel');

//create
const validCreateDosen = joi.object({
    nid         : joi.string().max(15).required(),
    nama        : joi.required(),
    jk          : joi.string().valid('L', 'P').required(),
    tgl_lahir   : joi.required(),
    tmp_lahir   : joi.required(),
    no_hp       : joi.required(),
    email       : joi.string().email().required()
});

const validationCreateDosen = async (req, res, next) => {
    try {
       
        const options = {
            abortEarly  : false,
            allowUnknow : true,
            stripUnknow : true
        };
        const value = await validCreateDosen.validate(req.body, options);
        if (value.error){
            res.json({error : value.error.details[0].message});
            return false;
        }
        const nidByBody = await dosen.getNidExit(req.body.nid); 
        if(nidByBody){
            res.json({error : 'Nid sudah terpakai'});
            return false;
        }
        next();
    } catch (error) {
        res.json({error : error});
        
    }
}
//end

//update
const validUpdateDosen = joi.object({
    nid         : joi.required(),
    nama        : joi.string().max(100),
    jk          : joi.string().valid('L', 'P'),
    tgl_lahir   : joi.date(),
    tmp_lahir   : joi.string(),
    no_hp       : joi.string().max(12),
    email       : joi.string().email()
});
const validationUpdateDosen = async (req, res, next) => {
    try {

        const options = {
            abortEarly  : false,
            allowUnknow : true,
            stripUnknow : true
        };
        const value = await validUpdateDosen.validate(req.body, options);
        if (value.error){
            res.json({error : value.error.details[0].message});
            return false;
        }
        const nid = await dosen.getNidByNid(req.params.nid, req.body.nid);
        const nidByParams = await dosen.getNidExit(req.params.nid);
        if(nid){
            res.json({error : 'Nid sudah digunakan'});
            return false;
        }
        if(!nidByParams){
            res.json({error : 'Nid tidak ada'});
            return false;
        }
        next();        
    } catch (error) {
        console.log(error);
        res.status(401).json({error : error});
        
    }
}
//end

//delete
const validationDeleteDosen = async (req, res, next) => {
    try {
        const nidByParams = await dosen.getNidExit(req.params.nid);
        if(!nidByParams){
            res.json({error : 'Nid tidak ada'});
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
    validationCreateDosen,
    validationUpdateDosen,
    validationDeleteDosen
}