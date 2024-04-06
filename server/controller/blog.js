const { Blog, Category } = require('../models');

exports.blogDetail = async (req, res) => {
  try {
    //req.params.id = 작성자
    console.log('req.params.id', req.params.id);
    //content 모델 내용 가져오기
    const result = await Blog.findByPk(req.params.id);
    res.json({ success: true, result: result }); //result.userId를 가지고 프론트에서
  } catch {
    console.log(error);
    res.json({ success: false, result: error });
  }
};

// member id로 블로그 조회
exports.find = async (req, res) => {
  console.log(req.query);
  const { memberId } = req.query;
  const result = await Blog.findOne({ where: { memberId } });
  console.log('req.query: ', req.query);
  res.json({ success: true, msg: '블로그 조회 완료', result });
};

// 블로그 정보 수정
exports.update = async (req, res) => {
  const { memberId, nickname, blogTitle, theme, blogInfo, bgColor, fontColor } =
    req.body;
  const find = await Blog.findOne({ where: { memberId } });
  if (find) {
    const result = await Blog.update(
      { nickname, blogTitle, theme, blogInfo, bgColor, fontColor },
      { where: { memberId } }
    );
  } else {
    const result = await Blog.create({
      memberId,
      nickname,
      blogTitle,
      theme,
      blogInfo,
      bgColor,
      fontColor,
    });
  }
  res.json({ success: true, msg: '블로그 수정 완료' });
};

// 카테고리 리스트 조회
exports.getCategory = async (req, res) => {
  const { memberId } = req.query;
  const find = await Blog.findOne({ where: { memberId } });
  console.log(find);
  if (find) {
    const result = await Category.findAll({ where: { blogId: find.id } });
    res.json({ success: true, result, msg: '블로그 조회 완료' });
  } else {
    res.json({ success: false, msg: '블로그 없음' });
  }
};

// 카테고리 추가
exports.newCategory = async (req, res) => {
  const { categoryName, group, memberId } = req.body;
  const find = await Blog.findOne({ where: { memberId } });
  const { id } = find;
  const result = await Category.create({ categoryName, group, blogId: id });
  res.json({ success: true, msg: '카테고리 추가 완료' });
};

// 카테고리 삭제
exports.delCategory = async (req, res) => {
  const result = await Category.destroy({ where: { id: req.body.id } });
  res.json({ success: true, msg: '카테고리 삭제 완료' });
};

//블로그 글 작성
// exports.createPost = async(req,res) => {
//   const {writerImg, nickname, }
// }
