const express = require('express');
const { newPost } = require('../controller/post');

const router = express.Router();

router.post('/write', newPost);

module.exports = router;
