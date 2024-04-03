import '../styles/Content.scss';
import { items } from '../data/SearchData';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';

const ContentInfo = styled.div`
  border-top: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const ContentContainer = styled.div`
  margin: 40px 20px 0 20px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 30px;
  }
`;
export default function Content() {
  const { id, postId } = useParams<{ id?: string; postId?: string }>();
  const navigate = useNavigate();
  const numericId = parseInt(id || '', 10);
  const numericPostId = parseInt(postId || '', 10);
  const matchedItem = items.find(
    (item) => item.id === numericId && item.postId === numericPostId
  );

  const goToPreviousPage = () => {
    navigate(-1); // 브라우저의 이전 페이지로 이동
  };

  useEffect(() => {
    if (!matchedItem) {
      alert('해당하는 게시물을 찾을 수 없습니다.');
      navigate(`/blog/${id}`);
    }
  }, [matchedItem, id, navigate]);
  return (
    <>
      {matchedItem ? (
        <>
          <ContentInfo>
            <button onClick={goToPreviousPage}>
              <img
                style={{ cursor: 'pointer' }}
                src={`${process.env.PUBLIC_URL}/images/ico-larr.png`}
                alt="왼쪽화살표"
              />
            </button>
            <div>{matchedItem.title}</div>
            <button>
              <img
                style={{ width: '24px', height: '24px' }}
                src={`${process.env.PUBLIC_URL}/images/ico-setting.png`}
                alt="설정"
              />
            </button>
          </ContentInfo>
          <ContentContainer>
            <div className="categoryName">카테고리명</div>
            <div className="contentTitle">{matchedItem.title}</div>
            <img src={matchedItem.writerImgUrl} alt="작성자이미지" />
          </ContentContainer>
        </>
      ) : null}
    </>
  );
}
