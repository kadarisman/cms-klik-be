const router = require('express').Router();
const middleware = require ('../middleware/Auth');
const validation = require('../validations/Post.validation')
const {
    getAllPost,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/PostController');

router.get('/', getAllPost);
router.get('/:id', getPostById);
router.post('/', middleware.isAuth, validation.validationCreatePost, createPost);
router.put('/:id', middleware.isAuth, validation.validationUpdatePost, updatePost);
router.delete('/:id', middleware.isAuth, deletePost);

module.exports = router;
