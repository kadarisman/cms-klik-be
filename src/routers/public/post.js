const router = require('express').Router();
const {
    getAllPost,
    getPostById
} = require('../../controllers/PostController');

router.get('/', getAllPost);
router.get('/:id', getPostById);

module.exports = router;
