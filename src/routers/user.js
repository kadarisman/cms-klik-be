const router = require('express').Router();
const middleware = require('.././middleware/Auth');
const validation = require('.././validations/User.validation');
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/UserController');

router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/', middleware.isAuth, validation.validationCreateUser, createUser);
router.put('/:id?', middleware.isAuth, validation.validationUpdateUser, updateUser);
router.delete('/:id?', deleteUser);

module.exports = router;