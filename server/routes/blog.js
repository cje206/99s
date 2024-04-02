const express = require('express');
const controller = require('../controller/blog');
const router = express.Router();

router.get('/:id', controller.blogDetail);

module.exports = router;
