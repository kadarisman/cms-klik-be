const router = require('express').Router();
const { getAllContent, getContenBytId, createContent, deleteContent, upload } = require('./../controllers/GalleryController');

router.get('/', getAllContent);
router.get('/:id', getContenBytId);
router.post('/', upload.single('content'), createContent);
router.delete('/:id', deleteContent);

module.exports = router;