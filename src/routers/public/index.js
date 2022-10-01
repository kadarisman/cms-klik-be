const router = require("express").Router();

const posts          = require('./post');
const categorys     = require('./category');

router.use('/posts', posts);
router.use('/categorys', categorys);

module.exports = router;