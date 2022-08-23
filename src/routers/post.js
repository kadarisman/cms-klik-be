const router = require('express').Router();
const middleware = require ('../middleware/Auth');
const {
    getAllPost,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/PostController');

router.get('/', getAllPost);
router.get('/:id', getPostById);
router.post('/', middleware.isAuth, createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
