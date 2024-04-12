const { Post, Like, Blog } = require('../models');
const { Op, where } = require('sequelize');

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

// 회원별 좋아요 리스트 조회
exports.likeList = async (req, res) => {
  const result = await Like.findAll({
    where: { memberId: req.query.memberId },
  });
  res.json({ success: true, result, msg: '좋아요 리스트 조회 완료' });
};

// 좋아요 여부 조회
exports.checkLike = async (req, res) => {
  const { memberId, postId } = req.query;
  const result = await Like.findOne({ where: { memberId, postId } });
  if (result) {
    res.json({ success: true, msg: '좋아요 중' });
  } else {
    res.json({ success: false, msg: '좋아요 안 함' });
  }
};

// 좋아요 리스트 조회
exports.findLike = async (req, res) => {
  const { postId } = req.query;
  const find = await Like.findAll({ where: { postId } });
  const result = {
    count: find.length,
    memberList: find.map(({ memberId }) => {
      return memberId;
    }),
  };
  res.json({ success: true, result, msg: '좋아요 리스트 조회 완료' });
};

// 좋아요 버튼 클릭
exports.clickLike = async (req, res) => {
  const { memberId, postId } = req.body;
  const find = await Like.findOne({ where: { memberId, postId } });
  if (find) {
    const result = await Like.destroy({ where: { memberId, postId } });
    res.json({ success: true, msg: '좋아요 삭제 완료' });
  } else {
    const result = await Like.create({ memberId, postId });
    res.json({ success: true, msg: '좋아요 추가 완료' });
  }
};

// 이전글, 다음글 검색
exports.otherPost = async (req, res) => {
  const { postId, blogId } = req.query;
  console.log(blogId);
  const next = await Post.findOne({
    where: { id: { [Op.gt]: postId }, blogId },
    order: [['id', 'asc']],
  });
  const prev = await Post.findOne({
    where: { id: { [Op.lt]: postId }, blogId },
    order: [['id', 'desc']],
  });
  console.log(next);
  res.json({
    success: true,
    result: [prev, next],
    msg: '이전 글 다음 글 조회 완료',
  });
};

// 카테고리별 게시글 검색
exports.category = async (req, res) => {
  if (req.query.categoryId) {
    const result = await Post.findAll({
      where: { categoryId: req.query.categoryId },
    });
    res.json({ success: true, result, msg: '카테고리 게시글 조회 완료' });
  } else if (req.query.id) {
    const find = await Blog.findOne({ where: { memberId: req.query.id } });
    const result = await Post.findAll({
      where: { blogId: find.id },
    });
    res.json({ success: true, result, msg: '전체 게시글 조회 완료' });
  } else {
    res.json({ success: false, msg: '조회 실패' });
  }
};
