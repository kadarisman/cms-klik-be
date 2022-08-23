const router = require("express").Router();

const login         = require('./login');
const users         = require('./user');
const posts          = require('./post');
const gallerys       = require('./gallery');
const comments      = require('./comment');
const categorys     = require('./category');
const postCategorys  = require('./postCategory');

router.use('/login', login);
router.use('/users', users);
router.use('/posts', posts);
router.use('/gallerys', gallerys);
router.use('/comments', comments);
router.use('/categorys', categorys);
router.use('/post-categorys', postCategorys);

module.exports = router;