const router = require('express').Router();
const middleware = require ('../middleware/Auth');
const { getBlogCOnfig, updateBlogConfig } = require('.././controllers/BlogConfigController');

router.get('/', getBlogCOnfig);
router.put('/:id', middleware.isAuth, updateBlogConfig);

module.exports = router;
