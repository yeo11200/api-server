const member = require('../controller/member.js');
const express = require('express');
const jwt = require('../util/jwt');
const router = express.Router();

router.post('/registor', jwt.verifyToken, member.registar);
router.post('/login', jwt.verifyToken, member.login);

module.exports = router;