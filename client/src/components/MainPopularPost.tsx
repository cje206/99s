import '../styles/MainPopularPost.scss';
import { useState } from 'react';
import Swipe from 'react-easy-swipe';
import {
  Container,
  PostImage,
  StyledImgDiv,
  Img,
  ImageCounterWrapper,
  ImageCounter,
} from '../components/MainPopularStyle';

export interface SwipeImg {
  imageUrl: string;
  title: string;
  writer: string;
  writerImgUrl: string;
  Date: string;
}

interface MainPopularPostProps {
  images: SwipeImg[];
}

export default function MainPopularPost({ images }: MainPopularPostProps) {
  const [positionx, setPositionx] = useState<number>(0);
  const [imgCount, setImgCount] = useState<number>(1);
  const [endSwipe, setEndSwipe] = useState<boolean>(false);

  const onSwipeMove = (position: { x: number }) => {
    setEndSwipe(false);
    if (images.length === 1) {
      return;
    }
    if (imgCount === 1 && position.x < 0) {
      setPositionx(() => position.x);
      return;
    }
    if (imgCount > 1 && imgCount < images.length) {
      setPositionx(() => position.x);
      return;
    }
    if (imgCount === images.length && position.x > 0) {
      setPositionx(() => position.x);
      return;
    }
  };

  const onSwipeEnd = () => {
    // 오른쪽으로 스와이프 (이전 이미지로)
    if (positionx > 20) {
      const prevImgCount = imgCount <= 1 ? images.length : imgCount - 1;
      setImgCount(prevImgCount);
    }
    // 왼쪽으로 스와이프 (다음 이미지로)
    else if (positionx < -20) {
      const nextImgCount = imgCount >= images.length ? 1 : imgCount + 1;
      setImgCount(nextImgCount);
    }
    setPositionx(0);
    setEndSwipe(true);
  };

  return (
    <>
      <p className="category" style={{ fontWeight: 'bold', fontSize: '18px' }}>
        인기 게시글
      </p>
      <Container>
        <PostImage>
          <Swipe onSwipeEnd={onSwipeEnd} onSwipeMove={onSwipeMove}>
            <StyledImgDiv
              imgCount={imgCount}
              positionx={positionx}
              endSwipe={endSwipe}
            >
              {images.map((image, index) => {
                return (
                  <div
                    key={index}
                    style={{ minWidth: '100%', textAlign: 'center' }}
                  >
                    {' '}
                    <Img src={image.imageUrl}></Img>
                  </div>
                );
              })}
            </StyledImgDiv>
          </Swipe>
        </PostImage>
        <div className="postTitle">{images[imgCount - 1].title}</div>
        <div className="writerInfo">
          {images[imgCount - 1].writerImgUrl && (
            <img
              className="writerImg"
              src={images[imgCount - 1].writerImgUrl}
              alt="작성자 사진"
            />
          )}
          <div className="writerDetail">
            <div style={{ fontSize: '20px', paddingBottom: '5px' }}>
              {images[imgCount - 1].writer}
            </div>
            <div
              style={{
                color: '#7E7F81',
                fontSize: '11px',
              }}
            >
              {images[imgCount - 1].Date}
            </div>
          </div>
        </div>
        {images.length > 1 && (
          <ImageCounterWrapper>
            {images.map((imageUrl, index) => {
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
