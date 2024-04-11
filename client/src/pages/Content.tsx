import { useNavigate, useParams } from 'react-router-dom';
import { BlogHeader } from '../components/Headers';
import { items } from '../data/SearchData';
import Content from '../components/Content';
import CommentComponent from '../components/BlogComment';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getColor } from '../components/Functions';
import { BlogObject, ColorObject, PostObject } from '../types';

export default function ContentPage() {
  const { id, postId } = useParams<{ id?: string; postId?: string }>();
  const itemId = parseInt(id ?? '0');
  const item = items.find((item) => item.id === itemId);
  const navigate = useNavigate();
  const [user, setUser] = useAuth();
  const [post, setPost] = useState<PostObject>({
    id: 0,
    postTitle: '',
    content: '',
    hashtag: [],
  });
  const [theme, setTheme] = useState<ColorObject>({
    background: '#333',
    color: '#fff',
  });
  const [blog, setBlog] = useState<BlogObject>({
    id: Number(postId),
    blogTitle: 'NOT FOUND',
    nickname: '',
  });

  const getBlog = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/blog/find',
      params: { memberId: id },
    });
    // console.log(res);
    const { bgColor, fontColor } = res.data.result;
    getColor(setTheme, res.data.result.theme, fontColor, bgColor);
    setBlog(res.data.result);
  };
  const getPost = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/post/find',
      params: { id: postId },
    });
    console.log(res);
    setPost(res.data.result);
  };

  useEffect(() => {
    setUser();
    getBlog();
    getPost();
  }, []);
  useEffect(() => {
    // console.log(theme);
  }, [theme]);

  return (
    <>
      <BlogHeader theme={theme}>{blog?.blogTitle || 'NOT FOUND'}</BlogHeader>
      <Content post={post} theme={theme} blog={blog} />
      <CommentComponent />
    </>
  );
}
