//현재 글을 써서 db에 저장하는것이 안되므로 data를 만들어서 임의로 지정

import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Info, items } from '../data/SearchData';
import '../styles/BlogMain.scss';
import { useEffect, useState } from 'react';
import MainPopularHorizontal from './MainPopularHorizontal';
import { data } from '../data/PopularHorizontalPost';
import MainCategory from './MainCategory';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const BlogMainContainer = styled.div`
  display: flex;
  margin: 40px 20px 0 20px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 30px;
  }
`;

const BlogDetail = styled.div`
  flex-direction: column;
  .nickName {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .blogInfo {
    font-size: 15px;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 표시할 최대 행 수 */
    overflow: hidden;
    max-width: 100%;
    color: #7e7f81;
  }
`;
const PopularPost = styled.div`
  margin: 20px 20px 70px 20px;
`;

interface Blog {
  id: number;
  nickname: string;
  blogTitle: string;
  theme: number;
  view: number;
  subscribeCount: number;
  subscribeList: number[];
  bgcolor?: string;
  fontColor?: string;
  blogInfo?: string;
}

export default function BlogMain() {
  const { id } = useParams<{ id?: string }>();
  const navigator = useNavigate();
  const [user, setUser] = useAuth();
  const [blogInfo, setBlogInfo] = useState<Blog>();
  const post = items.find(
    (item: { id: number }) => item.id === (id ? parseInt(id) : NaN)
  );
  const [highestView, setHighestView] = useState<Info | null>(null);
  const [layoutMode, setLayoutMode] = useState('horizontal');

  const handleLayoutChange = (mode: string) => {
    setLayoutMode(mode);
  };

  const getBlogInfo = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/blog/find',
      params: { memberId: id },
    });
    console.log(res);
    if (res.data.result.lenght === 0) {
      navigator('/');
    }
    setBlogInfo(res.data.result);
  };

  useEffect(() => {
    setUser();
  }, []);
  useEffect(() => {
    getBlogInfo();
  }, [user]);

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
    <>
      {blogInfo && (
        <BlogMainContainer>
          <img src={post?.writerImgUrl} alt="작성자이미지"></img>
          <BlogDetail>
            <div className="nickName">{blogInfo.nickname}</div>
            <div className="blogInfo">{blogInfo.blogInfo}</div>
          </BlogDetail>
        </BlogMainContainer>
      )}
      <div className="hr">
        <div className="linkChat">
          <Link to="/chat">1:1 채팅</Link>
        </div>
        <div className="react">
          {/* 나중에 아이콘 추가 및 db에서 저장되는 값으로 출력*/}
          <div className="likeCount">3</div>
          <div className="postCount">10</div>
          <div className="share">공유</div>
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
                <div className="likeCount">3</div>
                <div className="comment">30</div>
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
            <img
              style={{ width: '20px', height: '20px' }}
              src={`${process.env.PUBLIC_URL}/images/ico-horizontal.png`}
              alt="가로레이아웃"
            />
          </button>
          <button
            className="verticalForm"
            style={{
              cursor: layoutMode === 'vertical' ? 'default' : 'pointer',
            }}
            onClick={() => handleLayoutChange('vertical')}
          >
            <img
              style={{ width: '20px', height: '20px' }}
              src={`${process.env.PUBLIC_URL}/images/ico-vertical.png`}
              alt="세로레이아웃"
            />
          </button>
        </div>
      </div>
      {layoutMode === 'horizontal' ? (
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
    </>
  );
}
