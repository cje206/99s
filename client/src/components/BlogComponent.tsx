import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Info, items } from '../data/SearchData';
import styled from 'styled-components';
import { ReactComponent as IcoLike } from '../images/ico-like.svg';
import { ReactComponent as IcoComment } from '../images/ico-comment.svg';
import { ReactComponent as IcoHorizon } from '../images/ico-horizon.svg';
import { ReactComponent as IcoVertical } from '../images/ico-vertical.svg';
import { PostObject, ThemeStyle } from '../types';
import MainCategory from '../components/MainCategory';
import MainPopularHorizontal from '../components/MainPopularHorizontal';
import { data } from '../data/PopularHorizontalPost';
import axios from 'axios';
import { getThumbnail, getTimeText, htmlToText } from './Functions';
import { VerticalPost } from './Lists';

const PopularPost = styled.div`
  margin: 20px 20px 70px 20px;
`;
export function BlogProfile() {
  return <div></div>;
}
export function BlogCategory() {
  return <div></div>;
}

export function BlogPopular() {
  const { id } = useParams<{ id?: string }>();
  const [post, setPost] = useState<PostObject>();

  const getPost = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/post/popular',
      params: { id: Number(id) },
    });
    setPost(res.data.result[0]);
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <>
      <div className="Info">인기 게시글</div>
      {/* DB에서 조회수 가장 높은 걸로 가져오게(연결만 다시) , 지금 현재는 만든 db에서 view 높은걸로 가져오게 설정함*/}
      <PopularPost>
        {post ? (
          <VerticalPost id={Number(id)} post={post} />
        ) : (
          <p>게시물이 없습니다.</p>
        )}
      </PopularPost>
    </>
  );
}

export default function BlogPosts({
  theme,
  children,
}: {
  theme: ThemeStyle;
  children: string;
}) {
  const { id } = useParams<{ id?: string }>();
  const [layoutMode, setLayoutMode] = useState('horizontal');
  const [postList, setPostList] = useState<PostObject[]>();

  const handleLayoutChange = (mode: string) => {
    setLayoutMode(mode);
  };

  const getPostList = async () => {
    if (id) {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:8000/api/post/category',
        params: { id },
      });
      console.log(res);
      setPostList(res.data.result);
    }
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <>
      <div className="Info">
        <div>{children}</div>
        <div className="layout">
          <button
            className="horizontalForm"
            style={{
              cursor: layoutMode === 'horizontal' ? 'default' : 'pointer',
            }}
            onClick={() => handleLayoutChange('horizontal')}
          >
            <IcoHorizon
              fill={layoutMode === 'horizontal' ? theme.background : '#d9d9d9'}
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
              fill={layoutMode === 'vertical' ? theme.background : '#d9d9d9'}
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
    </>
  );
}
