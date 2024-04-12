const { Blog, Post, Subscribe } = require('../models');

exports.getInfo = async (req, res) => {
  const { blogId } = req.query;
  const find = await Blog.findOne({ where: { id: blogId } });
  const subList = await Subscribe.findAll({ where: { blogId } });
  const postList = await Post.findAll({ where: { blogId } });
  res.json({
    success: true,
    result: {
      memberId: find.memberId,
      nickname: find.nickname,
      subscribe: subList,
      postList,
    },
    msg: '구독 정보 검색 완료',
  });
};
