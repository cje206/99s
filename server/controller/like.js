const { Post, Blog } = require('../models');
const { nickname, getTimeText } = require('./chat');

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
