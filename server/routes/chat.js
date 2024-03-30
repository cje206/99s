const express = require('express');
const { check, write } = require('../controller/chat');
const router = express.Router();

router.get('/check', check);
router.post('/write', write);

module.exports = router;
