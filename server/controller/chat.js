const { Chat, Room } = require('../models');
const { Op } = require('sequelize');

// 채팅 리스트 조회
exports.find = async (req, res) => {
  const { userId } = req.query;
  const result = await Room.findAll({
    where: {
      roomId: {
        [Op.or]: [{ [Op.like]: `%to${userId}` }, { [Op.like]: `${userId}to%` }],
      },
    },
  });
  res.json({ success: true, result, message: '채팅 리스트 조회 완료' });
};

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
  const update = await Room.update(
    { recentMsg: chatMsg },
    { where: { roomId } }
  );
  res.json({ success: true, result, message: '채팅 추가 완료' });
};
