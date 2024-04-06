const express = require('express');
const {
  blogDetail,
  find,
  update,
  getCategory,
  newCategory,
  delCategory,
  updateCategory,
} = require('../controller/blog');

const router = express.Router();

router.get('/find', find);
router.patch('/update', update);
router.get('/getCategory', getCategory);
router.post('/newCategory', newCategory);
router.delete('/delCategory', delCategory);

// router.post('/write',)

router.patch('/updateCategory', updateCategory);
// router.get('/:id', blogDetail);


module.exports = router;
