const { Comment } = require('../models');

// 특정 포스트의 모든 댓글 조회
exports.getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.findAll({
      where: { postId: postId },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
/*
// 새 댓글 추가
exports.addComment = async (req, res) => {
  try {
    const { author, content, isSecret, parentIndex, postId } = req.body;
    const newComment = await Comment.create({
      author,
      content,
      isSecret,
      parentIndex,
      postId,
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
*/
// 새 댓글 추가 시 유효성 검사 추가 예시
exports.addComment = async (req, res) => {
  try {
    const { author, content, isSecret = false, parentIndex, postId } = req.body;

    // 유효성 검사 예시
    if (!author || !content || typeof isSecret !== 'boolean' || !postId) {
      return res.status(400).json({ message: '잘못된 요청입니다.' });
    }

    const newComment = await Comment.create({
      author,
      content,
      isSecret,
      parentIndex,
      postId,
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
