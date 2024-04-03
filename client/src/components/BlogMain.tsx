//현재 글을 써서 db에 저장하는것이 안되므로 data를 만들어서 임의로 지정

import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { items } from '../data/SearchData';
import '../styles/BlogMain.scss';

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

export default function BlogMain() {
  const { id } = useParams<{ id?: string }>();
  const post = items.find((item) => item.id === (id ? parseInt(id) : NaN));

  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }
  return (
    <>
      <BlogMainContainer>
        <img src={post.writerImgUrl}></img>
        <BlogDetail>
          <div className="nickName">{post.nickname}</div>
          <div className="blogInfo">{post.blogintro}</div>
        </BlogDetail>
      </BlogMainContainer>
      <span className="hr"></span>
    </>
  );
}
