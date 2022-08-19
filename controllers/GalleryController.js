const gallery = require('./../models/ModelGallery');
const multer  = require('multer'); //multipar form-data
const path = require('path');
const uploadDir = '/img/';
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: "./public"+uploadDir,
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)  

        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
})

const upload = multer({storage: storage, dest: uploadDir });

const getAllContent = async  (req, res) => {
    try {
        const contents = await gallery.getAllContent();
        res.status(201).json({ data : contents});
    } catch (error) {
        res.status(400).json({ message : error });
    }
}

const createContent = async (req, res) => {
    try {
        const contentData = {
            content : req.file.filename
        }
        gallery.insertContent(contentData)
        .then(row => {
            res.status(201).json({ message : "A Content into Gallery has been created"})
        })
        .catch(err => {
            res.status(400).json({ message: err});
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const deleteContent = async (req, res) => {
    try {
        const id = req.params.id;
        const contentId = await gallery.getContentId(id);
        if(!contentId){
            res.status(201).json({ message : `Content with id ${id} not available`});
            return false;
        }
        gallery.deletContent(id)
        .then(row => {
            res.status(201).json({ message: `Content with id ${id} has been deleted`});
        })
        .catch(err => {
            res.status(400).json({ message: err});
        })
    } catch (error) {
        res.status(500).json({ message: error });        
    }
}

module.exports = {
    getAllContent,
    createContent,
    deleteContent,
    upload
}