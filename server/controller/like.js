const { Post, Blog } = require('../models');

// 시간
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

exports.getInfo = async (req, res) => {
  const { postId } = req.query;
  const postInfo = await Post.findOne({ where: { id: postId } });
  const blogInfo = await Blog.findOne({ where: { id: postInfo.blogId } });
  res.json({
    success: true,
    result: {
      memberId: blogInfo.memberId,
      blogId: blogInfo.id,
      nickname: blogInfo.nickname,
      title: postInfo.postTitle,
      content: postInfo.content,
      createdAt: getTimeText(postInfo.createdAt),
    },
    msg: '좋아요 정보 검색 완료',
  });
};
