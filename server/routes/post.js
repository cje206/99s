const express = require('express');
const {
  newPost,
  find,
  checkLike,
  findLike,
  clickLike,
} = require('../controller/post');

const router = express.Router();

router.post('/write', newPost);
router.get('/find', find);
router.get('/checkLike', checkLike);
router.get('/findLike', findLike);
router.post('/clickLike', clickLike);

module.exports = router;
