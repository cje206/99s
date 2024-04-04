import '../styles/Content.scss';
import { items } from '../data/SearchData';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ButtonExtraStyled } from './MainPopularStyle';

const ContentInfo = styled.div`
  border-top: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const ContentTopContainer = styled.div`
  margin: 40px 20px 0 20px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 30px;
  }
`;
const ContentMiddleContainer = styled.div`
  margin: 20px 20px 0 20px;
`;

const WriterInfo = styled.div`
  /* padding: 20px; */
`;

export default function Content() {
  const { id, postId } = useParams<{ id?: string; postId?: string }>();
  const navigate = useNavigate();
  const numericId = parseInt(id || '', 10);
  const numericPostId = parseInt(postId || '', 10);

  // const matchedItem = items.find(
  //   (item) => item.id === numericId && item.postId === numericPostId
  // );

  const matchedItemIndex = items.findIndex(
    (item) => item.id === numericId && item.postId === numericPostId
  );

  // 현재 게시물
  const matchedItem = items[matchedItemIndex];

  // matchedItemIndex보다 작은 인덱스 중에서 id가 일치하는 가장 가까운 항목 찾기
  const prevItem = [...items] // items 배열 복사하여 원본 배열 보존
    .reverse() // 복사한 배열을 역순으로
    .find((item, index, self) => {
      // 역순 배열에서의 인덱스를 원본 배열에서의 인덱스로 변환
      const originalIndex = self.length - 1 - index;
      return item.id === numericId && originalIndex < matchedItemIndex;
    });

  console.log('prevItem', postId);
  const nextItem = items.find(
    (item, index) => index > matchedItemIndex && item.id === numericId
  );

  const goToPreviousPage = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (matchedItemIndex === -1) {
      alert('해당하는 게시물을 찾을 수 없습니다.');
      navigate(`/blog/${id}`);
    }
  }, [matchedItemIndex, id, navigate]);
  return (
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
      <ContentTopContainer>
        <div className="categoryName">카테고리명</div>
        <div className="contentTitle">{matchedItem.title}</div>
        <div className="contentDetail">
          <img src={matchedItem.writerImgUrl} alt="작성자이미지" />
          <div className="block">
            <div className="writer">{matchedItem.writer}</div>
            <div className="block1">
              <div className="date">{matchedItem.date} · </div>
              <div className="view">조회 {matchedItem.view}</div>
            </div>
          </div>
          <button className="shareBtn">
            <img
              className="shareImg"
              src={`${process.env.PUBLIC_URL}/images/ico-share.png`}
              alt="공유하기버튼"
            />
          </button>
        </div>
      </ContentTopContainer>
      <hr
        style={{
          border: '1px solid #E1E1E1',
          // marginTop: '50px',
          marginBottom: '30px',
        }}
      />
      <ContentMiddleContainer>
        {/* 여기엔 블로그 내용  */}
        {/* 이때는 레이아웃을 우리가 잡을 수 없는데 어떻게 할건지?, 
            사람들마다 쓰는 방법이 다르니까. 그걸 그대로 가져올 수 있는지? */}
        <div className="hastag"></div>
        <div className="postReact">
          {/* <div className="likeSection"> */}
          <div className="likeIcon">좋아요</div>
          <div className="likesContainer">
            {/* 좋아요 누른 사람들 이미지 3개까지 보여주게 하기 */}
            <div className="likeImg">
              <img src="" alt="img" />
            </div>
            <div className="viewCount">{`${matchedItem.view}명이 좋아합니다.`}</div>
            {/* </div> */}
          </div>
          <button className="shareBtn">
            <img
              className="shareImg"
              src={`${process.env.PUBLIC_URL}/images/ico-share.png`}
              alt="공유하기버튼"
            />
          </button>
        </div>
      </ContentMiddleContainer>
      <hr
        style={{
          border: '1px solid #E1E1E1',
          // marginTop: '50px',
          marginBottom: '30px',
        }}
      />
      {prevItem ? (
        <>
          <div className="Info">이전글</div>
          <Link to={`/blog/${matchedItem.id}/${prevItem.postId}`}>
            <div className="contentWrapper">
              <div className="imageWrapper">
                <img src={prevItem.imageUrl} alt={prevItem.title} />
              </div>
              <div className="textWrapper">
                <div className="postTitle">{prevItem.title}</div>
                <div className="postContent">{prevItem.content}</div>
              </div>
            </div>
          </Link>
        </>
      ) : null}

      {nextItem ? (
        <>
          <div className="Info">다음글</div>
          <Link to={`/blog/${matchedItem.id}/${nextItem.postId}`}>
            <div className="contentWrapper">
              <div className="imageWrapper">
                <img src={nextItem.imageUrl} alt={nextItem.title} />
              </div>
              <div className="textWrapper">
                <div className="postTitle">{nextItem.title}</div>
                <div className="postContent">{nextItem.content}</div>
              </div>
            </div>
          </Link>
        </>
      ) : null}
      <WriterInfo>
        <div
          className="writerInfo"
          style={{ width: '100%', height: '110px', backgroundColor: '#F3F3F3' }}
        >
          <img src={matchedItem.writerImgUrl} alt="작성자이미지" />
          <div className="block2">
            <div className="writer">{matchedItem.writer} </div>
            <div className="subscribe">구독자 {matchedItem.subscribe}명</div>
          </div>
          <ButtonExtraStyled smallBtn className="subscribeBtn">
            {/* 구독하기 버튼 */}
            구독하기
          </ButtonExtraStyled>
        </div>
      </WriterInfo>
    </>
  );
}
