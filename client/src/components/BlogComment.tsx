import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import '../styles/comment.scss';

const BlogComment = styled.div`
  margin: 20px;
`;
const CommentContent = styled.div`
  margin: 20px;
`;

export default function Comment() {
  const { id, postId } = useParams<{ id?: string; postId?: string }>();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<string[]>([]); // 댓글 목록
  const [newComment, setNewComment] = useState(''); // 새 댓글 입력값

  // 댓글 섹션 표시/숨김을 토글하는 함수
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  // 새 댓글을 comments 배열에 추가하는 함수
  const addComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment(''); // 입력 필드 초기화
    }
  };

  return (
    <BlogComment>
      <div className="commentTop">
        <div className="commentCount">{`${comments.length}개의 댓글`}</div>
        <button onClick={toggleComments}>
          <img
            src={`${process.env.PUBLIC_URL}/images/${
              showComments ? 'ico-arrowDown' : 'ico-arrowUp'
            }.png`}
            alt="Toggle comments"
          />
        </button>
      </div>
      <hr
        style={{
          border: '1px solid #E1E1E1',
          marginBottom: '30px',
        }}
      />
      {showComments && (
        <CommentContent>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
          />
          <button onClick={addComment}>댓글 추가</button>
          {comments.map((comment, index) => (
            <div key={index}>{comment}</div>
          ))}
        </CommentContent>
      )}
    </BlogComment>
  );
}
