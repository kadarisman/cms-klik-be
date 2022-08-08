const joi = require('joi');
const mahasiswa = require('./../models/MahasiswaModel');


//validation for create
const validCreateMahasiswa = joi.object({
    nim         : joi.string().max(15).required(),
    nama        : joi.required(),
    jk          : joi.string().valid('L', 'P').required(),
    tgl_lahir   : joi.required(),
    tmp_lahir   : joi.required(),
    no_hp       : joi.required(),
    email       : joi.string().email().required()
});

const validationCreateMahasiswa = async (req, res, next) => {
    try {
       
        const options = {
            abortEarly  : false,
            allowUnknow : true,
            stripUnknow : true
        };
        const value = await validCreateMahasiswa.validate(req.body, options);
        if (value.error){
            res.json({error : value.error.details[0].message});
            return false;
        }
        const nimByBody = await mahasiswa.getNimExit(req.body.nim); 
        if(nimByBody){
            res.json({error : 'Nim sudah terpakai'});
            return false;
        }
        next();
    } catch (error) {
        res.json({error : error});
        
    }
}
//end

//validation for update
const validUpdateMahasiswa = joi.object({
    nim         : joi.required(),
    nama        : joi.string().max(100),
    jk          : joi.string().valid('L', 'P'),
    tgl_lahir   : joi.date(),
    tmp_lahir   : joi.string(),
    no_hp       : joi.string().max(12),
    email       : joi.string().email()
});
const validationUpdateMahasiswa = async (req, res, next) => {
    try {

        const options = {
            abortEarly  : false,
            allowUnknow : true,
            stripUnknow : true
        };
        const value = await validUpdateMahasiswa.validate(req.body, options);
        if (value.error){
            res.json({error : value.error.details[0].message});
            return false;
        }
        const nim = await mahasiswa.getNimByNim(req.params.nim, req.body.nim);
        const nimByParams = await mahasiswa.getNimExit(req.params.nim);
        if(nim){
            res.json({error : 'Dilarang'});
            return false;
        }
        if(!nimByParams){
            res.json({error : 'Nim tidak ada'});
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
const validationDeleteMahasiswa = async (req, res, next) => {
    try {
        const nimByParams = await mahasiswa.getNimExit(req.params.nim);
        if(!nimByParams){
            res.json({error : 'Nim tidak ada'});
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
    validationCreateMahasiswa,
    validationDeleteMahasiswa,
    validationUpdateMahasiswa
}