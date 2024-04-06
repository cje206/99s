const express = require('express');
const { getCommentsByPostId, addComment } = require('../controller/comment');
const router = express.Router();

router.get('/blog/:id/:postId/comments', getCommentsByPostId);
router.post('/blog/:id/:postId/comments', addComment);

module.exports = router;
