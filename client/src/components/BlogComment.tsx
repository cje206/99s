//나중에 페이지네이션도 추가

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/comment.scss';
import styled from 'styled-components';

interface Comment {
  id: number;
  content: string;
  children?: Comment[]; // 대댓글을 위한 속성 추가
}

interface Params {
  id: string; // 블로그 ID
  postId: string; // 포스트 ID
}
const BlogComment = styled.div`
  margin: 20px;
  img {
    margin-bottom: 10px;
  }
`;

export default function CommentComponent() {
  const { id, postId } = useParams<{ postId: string; id: string }>();

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null); // 대댓글을 위한 상태

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (postId) {
        const response = await axios({
          method: 'GET',
          url: `http://localhost:8000/api/blog/${id}/${postId}/comments`,
        });
        const sortedComments = sortComments(response.data);
        setComments(sortedComments);
      }
    };
    // fetchComments();
  }, [id, postId]);

  const sortComments = (comments: any[]) => {
    const parentComments = comments.filter(
      (comment) => comment.parentIndex === null
    );
    const childComments = comments.filter(
      (comment) => comment.parentIndex !== null
    );

    parentComments.forEach((parent) => {
      parent.children = childComments.filter(
        (child) => child.parentIndex === parent.id
      );
    });

    return parentComments;
  };

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      try {
        const response = await axios({
          method: 'POST', // 수정: POST 메서드 사용
          url: `http://localhost:8000/api/blog/${id}/${postId}/comments`,
          data: {
            author: 'author',
            content: newComment,
            isSecret: false,
            parentId: replyTo,
            postId: postId,
          },
        });
        const updatedComments = [...comments, response.data];
        setComments(sortComments(updatedComments)); // 수정: 새 댓글 추가 후 정렬
        setNewComment('');
        setReplyTo(null);
      } catch (error) {
        console.error('댓글 추가 에러', error);
      }
    }
  };

  const addReply = async (parentId: number, newComment: string) => {
    if (newComment.trim() !== '') {
      try {
        const response = await axios({
          method: 'POST',
          url: `http://localhost:8000/api/blog/${id}/${postId}/comments`,
          data: {
            author: 'author',
            content: newComment,
            isSecret: false,
            parentId: parentId,
            postId: postId,
          },
        });

        const updatedComments = [...comments, response.data];
        setComments(sortComments(updatedComments));
        setNewComment('');
        setReplyTo(null);
      } catch (error) {
        console.error('답글 추가 에러', error);
      }
    }
  };

  const renderComments = (
    comments: Comment[],
    depth: number = 0
  ): JSX.Element[] => {
    return comments.map((comment: Comment) => (
      <div
        className="replyArea"
        key={comment.id}
        style={{ marginLeft: `${depth * 20}px`, marginTop: '10px' }}
      >
        <p>{comment.content}</p>
        <button onClick={() => setReplyTo(comment.id)}>답글 달기</button>

        {replyTo === comment.id && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addReply(comment.id, newComment); // 대댓글을 추가하는 함수, 구현 필요
              setNewComment('');
              setReplyTo(null); // 대댓글 추가 후 textarea 숨기기
            }}
          >
            <textarea
              className="commentArea"
              style={{ width: '100%', height: '50px', marginTop: '10px' }}
              value={newComment}
              placeholder="답글을 입력하세요."
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button type="submit">답글 추가</button>
          </form>
        )}

        {comment.children && renderComments(comment.children, depth + 1)}
      </div>
    ));
  };

  return (
    <BlogComment>
      <div className="commentTop">
        <div className="commentCount">{`${comments.length}개의 댓글`}</div>
        <button onClick={toggleComments}>
          <img
            style={{ width: '20px', height: 'auto' }}
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
        }}
      />
      {showComments && (
        <>
          <form onSubmit={addComment}>
            {/* {replyTo && <p>대댓글 작성 중...</p>} */}
            <textarea
              className="commentArea"
              style={{ width: '100%', height: '50px' }}
              value={newComment}
              placeholder="블로그가 훈훈해지는 댓글 부탁드립니다."
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button type="submit">댓글 추가</button>
          </form>

          <div>{renderComments(comments)}</div>
        </>
      )}
    </BlogComment>
  );
}
