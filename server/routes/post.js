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

module.exports = router;
