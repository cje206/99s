const { Post } = require('../models');

// 포스트 등록
exports.newPost = async (req, res) => {
  try {
    const { postTitle, content, blogId, hashtag } = req.body;
    let categoryId = null;
    if (req.body.categoryId) {
      categoryId = req.body.categoryId;
    }
    if (req.body.id) {
      const result = await Post.update(
        { postTitle, content, blogId, hashtag, categoryId },
        { where: { id: req.body.id } }
      );
      res.json({
        success: true,
        result: { id: req.body.id },
        msg: '글 수정 완료',
      });
    } else {
      const result = await Post.create({
        postTitle,
        content,
        blogId,
        hashtag,
        categoryId,
      });
      res.json({ success: true, result, msg: '글 등록 완료' });
    }

    console.log('result', result);
  } catch (error) {
    console.log(error);
    res.json({ success: false, result: error, msg: '글 등록 실패' });
  }
};

// 포스트 조회
exports.find = async (req, res) => {
  const result = await Post.findOne({ where: { id: req.query.id } });
  res.json({ success: true, result, msg: '포스트 조회 완료' });
};
