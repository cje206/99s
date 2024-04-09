const express = require('express');
const { newPost, find } = require('../controller/post');

const router = express.Router();

router.post('/write', newPost);
router.get('/find', find);

module.exports = router;
