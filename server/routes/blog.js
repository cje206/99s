const express = require('express');
const {
  blogDetail,
  find,
  update,
  getCategory,
  newCategory,
  delCategory,
} = require('../controller/blog');

const router = express.Router();

router.get('/find', find);
router.patch('/update', update);
router.get('/getCategory', getCategory);
router.get('/:id', blogDetail);
router.post('/newCategory', newCategory);
router.delete('/delCategory', delCategory);
// router.post('/write',)

module.exports = router;
