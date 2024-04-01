const { Chat, Room, Member } = require('../models');
const { Op } = require('sequelize');

const getTimeText = (time) => {
  let recentTime = new Date(time);
  let nowTime = new Date();
  let displayTime = '';
  let hDiff = (nowTime.getTime() - recentTime.getTime()) / (60 * 60 * 1000);
  if (hDiff < 24) {
    recentTime.getHours() <= 12
      ? (displayTime = `오전 ${recentTime.getHours()}:${recentTime.getMinutes()}`)
      : (displayTime = `오후 ${
          recentTime.getHours() - 12
        }:${recentTime.getMinutes()}`);
  } else {
    displayTime = `${recentTime.getMonth() + 1}월 ${recentTime.getDate()}일`;
  }
  return displayTime;
};

// 채팅 리스트 조회
exports.find = async (req, res) => {
  const { userId } = req.query;
  const result = [];
  const find1 = await Room.findAll({
    where: {
      roomId: { [Op.like]: `%to${userId}` },
    },
  });
  const find2 = await Room.findAll({
    where: {
      roomId: { [Op.like]: `${userId}to%` },
    },
  });

  for (let i = 0; i < find1.length; i++) {
    const [findId, _] = find1[i].roomId.split('to');
    const res = await Member.findOne({ where: { id: findId } });
    result.push({
      id: find1[i].id,
      roomId: find1[i].roomId,
      recentMsg: find1[i].recentMsg,
      nickname: res.username,
    });
  }
  for (let i = 0; i < find2.length; i++) {
    const [_, findId] = find2[i].roomId.split('to');
    const res = await Member.findOne({ where: { id: findId } });
    result.push({
      id: find2[i].id,
      roomId: find2[i].roomId,
      recentMsg: find2[i].recentMsg,
      updatedAt: getTimeText(find2[i].updatedAt),
      nickname: res.username,
    });
    console.log(result);
  }
  res.json({
    success: true,
    result,
    message: '채팅 리스트 조회 완료',
  });
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
