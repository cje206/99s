const { Chat } = require('../models');

// 채팅 내역 조회
exports.check = async (req, res) => {
  const { roomId } = req.query;
  const result = await Chat.findAll({ where: { roomId } });
  res.json({ success: true, result, message: '채팅 내역 조회 완료' });
};

// 채팅 내용 추가
exports.write = async (req, res) => {
  const { userId, chatMsg, roomId } = req.body;
  const result = await Chat.create({ userId, chatMsg, roomId });
  res.json({ success: true, result, message: '채팅 추가 완료' });
};
