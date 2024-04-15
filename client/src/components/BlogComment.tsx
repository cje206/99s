//나중에 페이지네이션도 추가

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/comment.scss';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import { CommentObj, ThemeStyle } from '../types';
import ProfileImage from './ProfileImage';

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
`;

export default function CommentComponent({ theme }: { theme: ThemeStyle }) {
  const { id, postId } = useParams<{ postId: string; id: string }>();
  const [user, setUser] = useAuth();
  const [comment, setComment] = useState<CommentObj[]>();
  const [isSecret, setIsSecret] = useState<number>(0);

  const [showComments, setShowComments] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');
  const [newReply, setNewReply] = useState<string>('');
  const [replyTo, setReplyTo] = useState<number | null>(null); // 대댓글을 위한 상태

  const toggleComments = () => {
    setShowComments(!showComments);
  };

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
    if (!user.id) {
      if (window.confirm('로그인 후 댓글을 작성할 수 있습니다.')) {
        document.location.href = '/signup';
        return;
      }
      return;
    }
    if (newComment.trim() !== '') {
      try {
        const res = await axios({
          method: 'POST', // 수정: POST 메서드 사용
          url: `${process.env.REACT_APP_HOST}/api/comment/addComment`,
          data: {
            memberId: user.id,
            content: newComment,
            isSecret,
            parentIndex: null,
            postId: postId,
          },
        });
        setNewComment('');
        getComment();
      } catch (error) {
        // console.error('댓글 추가 에러', error);
      }
    }
  };

  const addReply = async (parentIndex: number) => {
    if (!user.id) {
      return;
    }
    if (newReply.trim() !== '') {
      try {
        const res = await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_HOST}/api/comment/addComment`,
          data: {
            memberId: user.id,
            content: newReply,
            isSecret,
            parentIndex,
            postId: postId,
          },
        });

        setNewReply('');
        setReplyTo(null);
        getComment();
      } catch (error) {
        // console.error('답글 추가 에러', error);
      }
    }
  };

  const renderComments = (parentIndex: number) => {
    return (
      <form>
        <p className="addCommentTitle">답댓글 작성</p>
        <textarea
          className="commentArea"
          style={{ width: '100%', height: '50px', marginTop: '10px' }}
          value={newReply}
          placeholder="답글을 입력하세요."
          onChange={(e) => setNewReply(e.target.value)}
        ></textarea>
        <div className="commentBtns">
          <button
            type="button"
            className="secretBtn"
            style={
              isSecret
                ? theme
                : { color: theme.background, background: theme.color }
            }
            onClick={() => setIsSecret(isSecret === 1 ? 0 : 1)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/ico-secret.png`}
              alt=""
            />
            <p>{isSecret ? '비밀댓글 해제' : '비밀댓글'}</p>
          </button>
          <button
            type="button"
            className="addComment"
            style={theme}
            onClick={() => addReply(parentIndex)}
          >
            답댓글 추가
          </button>
        </div>
      </form>
    );
  };

  const getComment = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/comment/find`,
      params: { postId },
    });
    setComment(res.data.result);
  };

  const editComment = async (id: number) => {
    const res = await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_HOST}/api/comment/edit`,
      data: { id },
    });
    getComment();
  };

  const deleteComment = async (id: number) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) {
      return;
    }
    const res = await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_HOST}/api/comment/delete`,
      data: { id },
    });
    if (res.data.success) {
      alert('댓글 삭제가 완료되었습니다.');
      getComment();
    }
  };

  useEffect(() => {
    setUser();
    getComment();
  }, []);

  return (
    <BlogComment>
      <div className="commentTop" onClick={toggleComments}>
        <div className="commentCount">{`${
          comment?.length || '0'
        }개의 댓글`}</div>
        <img
          src={`${process.env.PUBLIC_URL}/images/${
            showComments ? 'ico-arrowDown' : 'ico-arrowUp'
          }.png`}
          alt="Toggle comments"
          className="arrow"
        />
      </div>
      {showComments && (
        <div className="commentWrap">
          {comment?.map((val) => {
            if (!val.parentIndex) {
              return (
                <div className="commentBox">
                  <div className="comment" key={val.id}>
                    <div className="commentWriter">
                      <div className="commentInfo">
                        <ProfileImage id={val.memberId} imgwidth="30px" />
                        <div>{val.nickname}</div>
                      </div>
                      {user.id === val.memberId && (
                        <div className="commentBtns">
                          <button
                            type="button"
                            onClick={() => editComment(val.id)}
                          >
                            수정
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteComment(val.id)}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                    {val.isSecret &&
                    user.id !== val.memberId &&
                    user.id !== Number(id) ? (
                      <div className="commentContent secret">
                        비밀 댓글입니다.
                      </div>
                    ) : (
                      <div className="commentContent">{val.content}</div>
                    )}
                    <div className="commentBottom">
                      <div className="commentTime">{val.createdAt}</div>

                      {(val.isSecret &&
                        user.id !== val.memberId &&
                        user.id !== Number(id)) || (
                        <button
                          className="replyBtn"
                          onClick={() => setReplyTo(val.id)}
                        >
                          답댓글 달기
                        </button>
                      )}
                    </div>
                  </div>
                  {replyTo === val.id && renderComments(val.id)}
                  {comment?.map((data) => {
                    if (val.id === data.parentIndex) {
                      return (
                        <div className="comment replyComment" key={data.id}>
                          <div className="commentWriter">
                            <div className="commentInfo">
                              <ProfileImage
                                id={data.memberId}
                                imgwidth="30px"
                              />
                              <div>{data.nickname}</div>
                            </div>
                            {user.id === data.memberId && (
                              <div className="commentBtns">
                                <button
                                  type="button"
                                  onClick={() => editComment(data.id)}
                                >
                                  수정
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteComment(data.id)}
                                >
                                  삭제
                                </button>
                              </div>
                            )}
                          </div>
                          {data.isSecret &&
                          user.id !== data.memberId &&
                          user.id !== Number(id) ? (
                            <div className="commentContent secret">
                              비밀 댓글입니다.
                            </div>
                          ) : (
                            <div className="commentContent">{data.content}</div>
                          )}
                          <div className="commentBottom">
                            <div className="commentTime">{data.createdAt}</div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            }
          })}
        </div>
      )}
      <form style={{ margin: 0 }}>
        <p className="addCommentTitle">댓글 작성</p>
        {/* {replyTo && <p>대댓글 작성 중...</p>} */}
        <textarea
          className="commentArea"
          value={newComment}
          placeholder="블로그가 훈훈해지는 댓글 부탁드립니다."
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="commentBtns">
          <button
            type="button"
            className="secretBtn"
            style={
              isSecret
                ? theme
                : { color: theme.background, background: theme.color }
            }
            onClick={() => setIsSecret(isSecret === 1 ? 0 : 1)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/ico-secret.png`}
              alt=""
            />
            <p>{isSecret ? '비밀댓글 해제' : '비밀댓글'}</p>
          </button>
          <button
            type="button"
            className="addComment"
            style={theme}
            onClick={addComment}
          >
            댓글 추가
          </button>
        </div>
      </form>
    </BlogComment>
  );
}
