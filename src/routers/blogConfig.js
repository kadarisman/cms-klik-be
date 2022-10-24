const router = require('express').Router();
const middleware = require ('../middleware/Auth');
const { getBlogCOnfig, updateBlogConfig } = require('.././controllers/BlogConfigController');

router.get('/', middleware.isAuth, getBlogCOnfig);
router.put('/:id', middleware.isAuth, updateBlogConfig);

module.exports = router;
