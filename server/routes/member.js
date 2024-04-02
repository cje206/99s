const express = require('express');
const {
  signup,
  login,
  find,
  searchId,
  update,
} = require('../controller/member');
const { auth } = require('../middleware');
const router = express.Router();

router.post('/signup', signup);
router.get('/login', login);
router.get('/find', auth, find);
router.get('/searchId', searchId);
router.patch('/update', update);

module.exports = router;
