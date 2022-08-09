const router = require('express').Router();
const { getAllContent, createContent, deleteContent, upload } = require('./../controllers/GalleryController');

router.get('/', getAllContent);
router.post('/', upload.single('content'), createContent);
router.delete('/:id', deleteContent);

module.exports = router;