const router = require('express').Router();
const { getAllContent, createContent, deleteContent } = require('./../controllers/GalleryController');

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

router.get('/', getAllContent);
router.post('/', upload.single('content'), createContent);
router.delete('/:id', deleteContent);

module.exports = router;