const express = require('express');
const { signup } = require('../controller/member');
const routre = express.Router();

routre.post('/signup', signup);

module.exports = routre;
