const router = require('express').Router();
const middleware = require ('../middleware/Auth');
const {
    getAllCategory,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('.././controllers/CategoryController');

router.get('/', getAllCategory);
router.get('/:id', getCategoryById)
router.post('/', middleware.isAuth, createCategory);
router.put('/:id', middleware.isAuth, updateCategory);
router.delete('/:id', middleware.isAuth, deleteCategory);

module.exports = router;
