const router = require('express').Router();
const { 
    getAllComment,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
 } = require('./../controllers/CommentController');

router.get('/', getAllComment);
router.get('/:id', getCommentById);
router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;