const express = require('express');
const { getInfo } = require('../controller/like');

const router = express.Router();

router.get('/getInfo', getInfo);

module.exports = router;
