// import { useParams } from 'react-router-dom';
// import BlogMain from '../components/BlogMain';
// import { BlogHeader } from '../components/Headers';
// import { items } from '../data/SearchData';

// export default function BlogHome() {
//   const { id } = useParams<{ id?: string }>();
//   const itemId = parseInt(id ?? '0');

//   const item = items.find((item) => item.id === itemId);

//   return (
//     <>
//       <BlogHeader blogTitle={item?.blogTitle ?? ''} />
//       <BlogMain />
//     </>
//   );
// }
//현재 글을 써서 db에 저장하는것이 안되므로 data를 만들어서 임의로 지정

import { Link, useNavigate, useParams } from 'react-router-dom';
import { items } from '../data/SearchData';
import '../styles/BlogMain.scss';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { BlogHeader } from '../components/Headers';
import { ThemeStyle } from '../types';
import { getColor } from '../components/Functions';
import BlogPosts, { BlogPopular } from '../components/BlogComponent';
import BlogMain from '../components/BlogMain';
import { NewPostBtn } from '../components/Btns';

interface Blog {
  id: number;
  memberId: number;
  nickname: string;
  blogTitle: string;
  theme: number;
  view: number;
  subscribeCount: number;
  subscribeList: number[] | [];
  fontColor: string;
  bgColor: string;
  writerImg?: string;
  blogInfo?: string;
}

export default function BlogHome({ position }: { position?: string }) {
  const { id } = useParams<{ id?: string }>();
  const navigator = useNavigate();
  const [user, setUser] = useAuth();
  const [blogInfo, setBlogInfo] = useState<Blog>({
    id: 0,
    memberId: 0,
    nickname: '',
    blogTitle: '',
    theme: 1,
    view: 0,
    subscribeCount: 0,
    subscribeList: [],
    fontColor: '#fff',
    bgColor: '#333',
  });
  const post = items.find(
    (item: { id: number }) => item.id === (id ? parseInt(id) : NaN)
  );
  const [theme, setTheme] = useState<ThemeStyle>({
    background: '#333',
    color: '#fff',
  });

  const getBlogInfo = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/blog/find',
      params: { memberId: id },
    });
    console.log(res.data.result);
    if (res.data.result) {
      setBlogInfo(res.data.result);
    }
    getColor(
      setTheme,
      res.data.result.theme,
      res.data.result.fontColor,
      res.data.result.bgColor
    );
  };

  useEffect(() => {
    setUser();
  }, []);
  useEffect(() => {
    getBlogInfo();
    console.log(blogInfo);
  }, [user]);
  useEffect(() => {}, [blogInfo]);

  return (
    <div className="wrap">
      <BlogHeader theme={theme}>
        {blogInfo.id !== 0 ? blogInfo.blogTitle : 'NOT FOUND'}
      </BlogHeader>
      {blogInfo.memberId === user.id && <NewPostBtn theme={theme} />}
      {blogInfo.id !== 0 ? (
        <BlogMain bloginfo={blogInfo} theme={theme} />
      ) : (
        <div className="body">
          <h1 className="title">페이지를 찾을 수 없습니다</h1>
          <Link to="/">Blo9 홈으로 이동</Link>
        </div>
      )}
      <BlogPopular />
      <BlogPosts theme={theme}>전체게시글</BlogPosts>
    </div>
  );
}
