const router = require("express").Router();

const login         = require('./login');
const users         = require('./user');
const posts          = require('./post');
const gallerys       = require('./gallery');
const comments      = require('./comment');
const categorys     = require('./category');
const postCategorys  = require('./postCategory');
const blogConfig  = require('./blogConfig');
const public = require('./public/index');

router.use('/public', public);
router.use('/login', login);
router.use('/users', users);
router.use('/posts', posts);
router.use('/gallerys', gallerys);
router.use('/comments', comments);
router.use('/categorys', categorys);
router.use('/post-categorys', postCategorys);
router.use('/blog-config', blogConfig);

module.exports = router;