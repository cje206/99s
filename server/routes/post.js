const express = require('express');
const {
  newPost,
  find,
  checkLike,
  findLike,
  clickLike,
  otherPost,
  category,
  likeList,
  popular,
} = require('../controller/post');

const router = express.Router();

router.post('/write', newPost);
router.get('/find', find);
router.get('/likeList', likeList);
router.get('/checkLike', checkLike);
router.get('/findLike', findLike);
router.post('/clickLike', clickLike);
router.get('/otherPost', otherPost);
router.get('/category', category);
router.get('/popular', popular);

module.exports = router;
