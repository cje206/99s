const express = require('express');
const { signup, login } = require('../controller/member');
const router = express.Router();

router.post('/signup', signup);
router.get('/login', login);

module.exports = router;
