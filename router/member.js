const member = require('../controller/member.js');
const express = require('express');
const jwt = require('../util/jwt');
const router = express.Router();

const middle = require('../middlerware/member.middlerware');

router.post('/registor', middle.join, member.registar);
router.post('/login', jwt.verifyToken, member.login);
router.post('/check', member.checkBoth);
module.exports = router;