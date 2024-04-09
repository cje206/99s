import '../styles/Content.scss';
import { items } from '../data/SearchData';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ButtonExtraStyled } from './MainPopularStyle';
import { PostContent, PostTitle, PostTop } from './PostComponent';
import { ColorObject } from '../types';
const ContentMiddleContainer = styled.div`
  margin: 20px 20px 0 20px;
`;

const WriterInfo = styled.div`
  /* padding: 20px; */
`;

export default function Content({
  post,
  theme,
}: {
  post: any;
  theme: ColorObject;
}) {
  console.log(post);
  const { id, postId } = useParams<{ id?: string; postId?: string }>();
  const [subscribe, setSubscribe] = useState(false);
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

  // console.log('prevItem', postId);
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

  const toggleSubscribe = () => {
    setSubscribe(!subscribe);
  };
  return (
    <>
      {Boolean(post) && (
        <div>
          <PostTop>{post.postTitle}</PostTop>
          <PostTitle post={post} />
          <PostContent content={post.content} hashtag={post.hashtag} />
          <ContentMiddleContainer>
            {/* 여기엔 블로그 내용  */}
            {/* 이때는 레이아웃을 우리가 잡을 수 없는데 어떻게 할건지?, 
							사람들마다 쓰는 방법이 다르니까. 그걸 그대로 가져올 수 있는지? */}
            {/* 여기에 글을 가져와서 확인할 수 있어야함 */}
            <div className="hastag"></div>
            <div className="postReact">
              {/* <div className="likeSection"> */}
              <div className="likeIcon">좋아요</div>
              <div className="likesContainer">
                {/* 좋아요 누른 사람들 이미지 3개까지 보여주게 하기 */}

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
              style={{
                width: '100%',
                height: '110px',
                backgroundColor: '#F3F3F3',
              }}
            >
              <img
                style={{ margin: '0 30px 0 20px' }}
                src={matchedItem.writerImgUrl}
                alt="작성자이미지"
              />
              <div className="block2">
                <div className="writer">{matchedItem.writer} </div>
                <div className="subscribe">
                  구독자 {matchedItem.subscribe}명
                </div>
              </div>
              {subscribe ? (
                <ButtonExtraStyled
                  onClick={toggleSubscribe}
                  smallbtn={false}
                  subscribebtn={true}
                  className="subscribeBtn"
                >
                  구독
                  <img src="/images/ico-check.png" alt="체크" />
                </ButtonExtraStyled>
              ) : (
                <ButtonExtraStyled
                  onClick={toggleSubscribe}
                  subscribebtn={false}
                  smallbtn={true}
                  className="subscribeBtn"
                >
                  구독하기
                </ButtonExtraStyled>
              )}
            </div>
          </WriterInfo>
        </div>
      )}
    </>
  );
}
