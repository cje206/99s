const { Member } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 회원가입
exports.signup = async (req, res) => {
  const { username, birth, email, pw } = req.body;
  const password = await bcrypt.hash(pw, 11);
  const result = await Member.create({ username, birth, email, password });
  res.json({ success: true, message: '회원가입 완료' });
};
