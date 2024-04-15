import '../styles/Content.scss';
import { items } from '../data/SearchData';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  OtherPost,
  PostContent,
  PostLike,
  PostTitle,
  PostTop,
  WriterProfile,
} from './PostComponent';
import { BlogObject, ColorObject, OtherPostObj, PostObject } from '../types';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

export default function Content({
  post,
  theme,
  blog,
}: {
  post: PostObject;
  theme: ColorObject;
  blog: BlogObject;
}) {
  const [user, setUser] = useAuth();
  const { id, postId } = useParams<{ id?: string; postId?: string }>();
  const [prevPost, setPrevPost] = useState<OtherPostObj>({
    id: 0,
    postTitle: '',
  });
  const [nextPost, setNextPost] = useState<OtherPostObj>({
    id: 0,
    postTitle: '',
  });
  const getOtherPost = async () => {
    console.log(blog.id);
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/post/otherPost`,
      params: { postId, blogId: blog.id },
    });
    console.log(res.data.result);
    if (res.data.result[0]) {
      setPrevPost(res.data.result[0]);
    }
    if (res.data.result[1]) {
      setNextPost(res.data.result[1]);
    }
  };
  useEffect(() => {
    getOtherPost();
  }, [blog]);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser();
    }
    getOtherPost();
  }, []);
  return (
    <>
      {Boolean(post) && (
        <div className="contentContainer">
          <PostTop>{post.postTitle}</PostTop>
          <PostTitle post={post} blog={blog} />
          <PostContent content={post.content} hashtag={post.hashtag} />
          <PostLike
            userid={user.id}
            memberid={Number(id)}
            postid={Number(postId)}
            theme={theme}
          />
          {Boolean(prevPost.id) && (
            <OtherPost
              title={prevPost?.postTitle}
              linkto={`/blog/${id}/${prevPost.id}`}
            >
              이전글
            </OtherPost>
          )}
          {Boolean(nextPost.id) && (
            <OtherPost
              title={nextPost?.postTitle}
              linkto={`/blog/${id}/${nextPost.id}`}
            >
              다음글
            </OtherPost>
          )}
          <WriterProfile userid={user.id} blog={blog} theme={theme} />
        </div>
      )}
    </>
  );
}
