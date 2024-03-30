const { Member } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 회원가입
exports.signup = async (req, res) => {
  const { username, birth, email, pw } = req.body;
  const password = await bcrypt.hash(pw, 11);
  const result = await Member.create({ username, birth, email, password });
  res.json({ success: true, msg: '회원가입 완료' });
};

// 로그인
exports.login = async (req, res) => {
  const { email, pw, maintain } = req.query;
  const result = await Member.findOne({ where: { email } });
  if (result) {
    const success = await bcrypt.compare(pw, result.password);
    if (success) {
      if (maintain) {
        const token = jwt.sign({ id: result.id }, process.env.SECRET, {
          expiresIn: '30d',
        });
        res.json({ success, msg: '로그인 완료', result, token });
      } else {
        const token = jwt.sign({ id: result.id }, process.env.SECRET, {
          expiresIn: '1h',
        });
        res.json({ success, msg: '로그인 완료', result, token });
      }
    } else {
      res.json({ success, msg: '비밀번호 오류' });
    }
  } else {
    res.json({ success: false, msg: '이메일 오류' });
  }
};
