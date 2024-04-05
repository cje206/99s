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
import styled from 'styled-components';
import { Info, items } from '../data/SearchData';
import '../styles/BlogMain.scss';
import { useEffect, useState } from 'react';
import { data } from '../data/PopularHorizontalPost';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import MainCategory from '../components/MainCategory';
import MainPopularHorizontal from '../components/MainPopularHorizontal';
import { BlogHeader } from '../components/Headers';
import { ReactComponent as IcoChat } from '../images/ico-chat.svg';
import { ReactComponent as IcoSubscribe } from '../images/ico-subscribe.svg';
import { ReactComponent as IcoPost } from '../images/ico-post.svg';
import { ReactComponent as IcoShare } from '../images/ico-share.svg';
import { ReactComponent as IcoLike } from '../images/ico-like.svg';
import { ReactComponent as IcoComment } from '../images/ico-comment.svg';
import { ReactComponent as IcoHorizon } from '../images/ico-horizon.svg';
import { ReactComponent as IcoVertical } from '../images/ico-vertical.svg';
import { ThemeStyle } from '../types';
import ProfileImage from '../components/ProfileImage';
import { getColor } from '../components/Functions';

const BlogMainContainer = styled.div<{ link?: string }>`
  display: flex;
  margin: 20px 20px 0 20px;
  .imgBox {
    width: 20%;
    border-radius: 50%;
    overflow: hidden;
  }
`;

const BlogDetail = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;
  box-sizing: border-box;
  .nickName {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .blogInfo {
    font-size: 14px;
    line-height: 1.2;
    color: #7e7f81;
  }
`;
const PopularPost = styled.div`
  margin: 20px 20px 70px 20px;
`;

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

export default function BlogHome() {
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
  const [highestView, setHighestView] = useState<Info | null>(null);
  const [layoutMode, setLayoutMode] = useState('horizontal');
  const [theme, setTheme] = useState<ThemeStyle>({
    background: '#333',
    color: '#fff',
  });

  const handleLayoutChange = (mode: string) => {
    setLayoutMode(mode);
  };

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
      res.data.result.theme,
      res.data.result.bgColor,
      res.data.result.fontColor,
      setTheme
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

  useEffect(() => {
    const postId = id ? parseInt(id) : NaN;
    // 현재 페이지 ID와 일치하고, 가장 조회수가 높은 게시물 찾기
    const relatedPosts = items.filter((item) => item.id === postId);
    const mostPopularPost =
      relatedPosts.sort((a, b) => (b.view || 0) - (a.view || 0))[0] || null;
    setHighestView(mostPopularPost);
  }, [id, items]);

  useEffect(() => {
    if (!post) {
      alert('해당하는 게시글을 찾을 수 없습니다.');
    }
  }, [post]);

  return (
    <div className="wrap">
      <BlogHeader theme={theme}>
        {blogInfo.id !== 0 ? blogInfo.blogTitle : 'NOT FOUND'}
      </BlogHeader>
      {blogInfo.id !== 0 ? (
        <div className="blog">
          <BlogMainContainer>
            <ProfileImage id={Number(id)} />
            <BlogDetail>
              <div className="nickName">{blogInfo.nickname}</div>
              <div className="blogInfo">{blogInfo.blogInfo}</div>
            </BlogDetail>
          </BlogMainContainer>
          <div className="hr" style={theme}>
            <div className="linkChat">
              {user.id === blogInfo.memberId ? (
                <Link to="/chat" className="blogIcons">
                  <IcoChat stroke={theme.color}></IcoChat>
                  <span>채팅 목록</span>
                </Link>
              ) : (
                <Link to="/chat" className="blogIcons">
                  <IcoChat stroke={theme.color}></IcoChat>
                  <span>1:1 채팅</span>
                </Link>
              )}
            </div>
            <div className="react">
              <div className="blogIcons subscribeCount">
                <IcoSubscribe stroke={theme.color}></IcoSubscribe>
                <span>{blogInfo.subscribeCount}</span>
              </div>
              <div className="blogIcons postCount">
                <IcoPost stroke={theme.color}></IcoPost>
                <span>10</span>
              </div>
              <div className="blogIcons share">
                <IcoShare stroke={theme.color}></IcoShare>
              </div>
            </div>
          </div>
          <div className="Info">인기 게시글</div>
          {/* DB에서 조회수 가장 높은 걸로 가져오게(연결만 다시) , 지금 현재는 만든 db에서 view 높은걸로 가져오게 설정함*/}
          <PopularPost>
            {highestView ? (
              <>
                <img
                  className="postImg"
                  src={highestView.imageUrl}
                  alt="Popular Post"
                />
                <div className="blogPostTitle">{highestView.title}</div>
                <div className="blogPostContent">{highestView.content}</div>
                <div className="postInfo">
                  <div className="Date">{highestView.date}</div>
                  <div className="postInfoDetail">
                    <div className="blogIcons likeCount">
                      <IcoLike stroke="#333" fill="none" />
                      <span>3</span>
                    </div>
                    <div className="blogIcons comment">
                      <IcoComment stroke="#333" fill="none" />
                      <span>30</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p>게시물이 없습니다.</p>
            )}
          </PopularPost>
          <div className="Info">
            <div>전체 게시글</div>
            <div className="layout">
              <button
                className="horizontalForm"
                style={{
                  cursor: layoutMode === 'horizontal' ? 'default' : 'pointer',
                }}
                onClick={() => handleLayoutChange('horizontal')}
              >
                <IcoHorizon
                  fill={
                    layoutMode === 'horizontal' ? theme.background : '#d9d9d9'
                  }
                />
              </button>
              <button
                className="verticalForm"
                style={{
                  cursor: layoutMode === 'vertical' ? 'default' : 'pointer',
                }}
                onClick={() => handleLayoutChange('vertical')}
              >
                <IcoVertical
                  fill={
                    layoutMode === 'vertical' ? theme.background : '#d9d9d9'
                  }
                />
              </button>
            </div>
          </div>
          {layoutMode === 'vertical' ? (
            <MainPopularHorizontal
              data={data.filter((d) => d.id === parseInt(id || '0'))} // ID에 맞는 데이터만 필터링
              showPagination={true}
            />
          ) : (
            <MainCategory
              items={items.filter((item) => item.id === parseInt(id || '0'))} // ID에 맞는 데이터만 필터링
              ShowContent={false}
              showPagination={true}
            />
          )}
        </div>
      ) : (
        <div className="body">
          <h1 className="title">페이지를 찾을 수 없습니다</h1>
          <Link to="/">Blo9 홈으로 이동</Link>
        </div>
      )}
    </div>
  );
}
