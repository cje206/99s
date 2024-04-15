import '../styles/MainPopularPost.scss';
import { useState } from 'react';
import Swipe from 'react-easy-swipe';
import {
  Container,
  StyledImgDiv,
  Img,
  ImageCounterWrapper,
  ImageCounter,
} from '../components/MainPopularStyle';
import { PostObject } from '../types';
import { PostLists } from './Lists';

export interface SwipeImg {
  imageUrl: string;
  title: string;
  writer: string;
  writerImgUrl: string;
  Date: string;
}

export default function MainPopularPost({
  postlist,
}: {
  postlist: PostObject[];
}) {
  const [positionx, setPositionx] = useState<number>(0);
  const [imgCount, setImgCount] = useState<number>(1);
  const [endSwipe, setEndSwipe] = useState<boolean>(false);

  const onSwipeMove = (position: { x: number }) => {
    setEndSwipe(false);
    if (postlist.length === 1) {
      return;
    }
    if (imgCount === 1 && position.x < 0) {
      setPositionx(() => position.x);
      return;
    }
    if (imgCount > 1 && imgCount < postlist.length) {
      setPositionx(() => position.x);
      return;
    }
    if (imgCount === postlist.length && position.x > 0) {
      setPositionx(() => position.x);
      return;
    }
  };

  const onSwipeEnd = () => {
    // 오른쪽으로 스와이프 (이전 이미지로)
    if (positionx > 20) {
      const prevImgCount = imgCount <= 1 ? postlist.length : imgCount - 1;
      setImgCount(prevImgCount);
    }
    // 왼쪽으로 스와이프 (다음 이미지로)
    else if (positionx < -20) {
      const nextImgCount = imgCount >= postlist.length ? 1 : imgCount + 1;
      setImgCount(nextImgCount);
    }
    setPositionx(0);
    setEndSwipe(true);
  };

  return (
    <>
      <Container>
        <Swipe onSwipeEnd={onSwipeEnd} onSwipeMove={onSwipeMove}>
          <StyledImgDiv
            imgCount={imgCount}
            positionx={positionx}
            endSwipe={endSwipe}
          >
            {postlist?.map((post) => (
              <div
                className="popularPost"
                key={post.id}
                style={{
                  minWidth: '100%',
                  boxSizing: 'border-box',
                  padding: '20px',
                }}
              >
                <PostLists post={post} vertical={false} />
              </div>
            ))}
          </StyledImgDiv>
        </Swipe>
        {postlist.length > 1 && (
          <ImageCounterWrapper>
            {postlist.map((post, index) => {
              return (
                <ImageCounter key={index} index={index} imgCount={imgCount} />
              );
            })}
          </ImageCounterWrapper>
        )}
      </Container>
    </>
  );
}
