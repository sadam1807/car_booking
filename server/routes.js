var express = require('express');
var router = express.Router();
var user = require('../server/controllers/users.js');

router.post('/users/login', user.login);
router.post('/users/register', user.register);

module.exports = router;