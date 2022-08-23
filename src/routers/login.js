const router = require('express').Router();
const {login} = require('../controllers/LoginController');

router.post('/', login);

module.exports = router;