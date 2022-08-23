const router = require('express').Router();
const {
    getAllCategory,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('.././controllers/CategoryController');

router.get('/', getAllCategory);
router.get('/:id', getCategoryById)
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
