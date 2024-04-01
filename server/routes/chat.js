const express = require('express');
const { check, write, find } = require('../controller/chat');
const router = express.Router();

router.get('/find', find);
router.get('/check', check);
router.post('/write', write);

module.exports = router;
