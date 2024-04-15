import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as IcoHorizon } from '../images/ico-horizon.svg';
import { ReactComponent as IcoVertical } from '../images/ico-vertical.svg';
import { PostObject, ThemeStyle } from '../types';
import axios from 'axios';
import { PostLists } from './Lists';

const PopularPost = styled.div`
  margin-bottom: 70px;
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
      url: `${process.env.REACT_APP_HOST}/api/post/popular`,
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
          <PostLists post={post} vertical={false} />
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
        url: `${process.env.REACT_APP_HOST}/api/post/category`,
        params: { id },
      });
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
      {layoutMode === 'vertical'
        ? postList?.map((val) => <PostLists post={val} vertical={true} />)
        : postList?.map((val) => <PostLists post={val} vertical={false} />)}
    </>
  );
}
