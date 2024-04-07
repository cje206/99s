const { Post } = require('../models');

//새로운 포스트 등록
exports.newPost = async (req, res) => {
  try {
    const { postTitle, content, likeCount, blogId } = req.body;
    console.log(req.body);
    console.log('blogid', blogId);

    const result = await Post.create({
      blogId,
      postTitle,
      content,
      likeCount,
    });
    console.log('result', result);
    res.json({ success: true, result, msg: '글 등록 완료' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, result: error, msg: '글 등록 실패' });
  }
};
