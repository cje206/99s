import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as IcoHorizon } from '../images/ico-horizon.svg';
import { ReactComponent as IcoVertical } from '../images/ico-vertical.svg';
import { PostObject, ThemeStyle } from '../types';
import axios from 'axios';
import { PostList, PostLists } from './Lists';
import Pagination from './Pagination';
import { Container } from './MainPopularStyle';

const PopularPost = styled.div`
  margin-bottom: 70px;
`;

const DesktopBlogMain = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
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
  const [postList, setPostList] = useState<PostObject[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isWide, setIsWide] = useState(window.innerWidth > 1160);
  const itemsPerPage = 6;

  // 페이지네이션 로직
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = postList.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  //layout
  const currentIndex = postList.slice(0, 6);
  const groupedItems = [...Array(Math.ceil(currentIndex.length / 3))].map(
    (_, i) => currentIndex.slice(i * 3, i * 3 + 3)
  );

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

      {isWide ? (
        <>
          {layoutMode === 'vertical' ? (
            <>
              {groupedItems.map((currentItems, index) => (
                <DesktopBlogMain key={index}>
                  {currentItems.map((val) => (
                    <div key={val.id} style={{ flex: '1 0 50%' }}>
                      <PostLists post={val} vertical={true} />
                    </div>
                  ))}
                </DesktopBlogMain>
              ))}
            </>
          ) : (
            <>
              {groupedItems.map((currentItems, index) => (
                <DesktopBlogMain key={index}>
                  {currentItems.map((val) => (
                    <div
                      key={val.id}
                      style={{ flex: '1 0 calc(33.333% - 40px)' }}
                    >
                      <PostLists post={val} vertical={false} />
                    </div>
                  ))}
                </DesktopBlogMain>
              ))}
            </>
          )}
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={postList.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      ) : (
        <>
          {layoutMode === 'vertical' ? (
            <>
              {currentItems.map((val) => (
                <PostLists key={val.id} post={val} vertical={true} />
              ))}
            </>
          ) : (
            <>
              {currentItems.map((val) => (
                <PostLists key={val.id} post={val} vertical={false} />
              ))}
            </>
          )}
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={postList.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </>
  );
}
