const router = require('express').Router();
const {
    getAllPostCategory,
    getPostCategoryByPostId,
    createPostCategory,
    updatePostCategory,
    deletePostCategory
} = require('.././controllers/PostCategoryController');
const { route } = require('./comment');

router.get('/', getAllPostCategory);
router.get('/:postId?', getPostCategoryByPostId);
router.post('/', createPostCategory);
router.put('/:postId?', updatePostCategory);
router.delete('/:postId?', deletePostCategory);

module.exports = router;