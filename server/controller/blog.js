const { Blog } = require('../models');

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
