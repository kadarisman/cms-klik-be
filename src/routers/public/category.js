const router = require('express').Router();
const {
    getAllCategory,
    getCategoryById
} = require('../../controllers/CategoryController');

router.get('/', getAllCategory);
router.get('/:id', getCategoryById)

module.exports = router;
