const router = require('express').Router();
const { 
    getAllComment,
    getAllCommentByPostIdById,
    createComment,
    updateComment,
    deleteComment,
    replyComment
 } = require('./../controllers/CommentController');

router.get('/', getAllComment);
router.get('/:postId/:id?', getAllCommentByPostIdById);
router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);
router.post('/', replyComment);

module.exports = router;