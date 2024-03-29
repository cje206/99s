import { useState } from 'react';
import Swipe from 'react-easy-swipe';
import {
  Container,
  PostImage,
  StyledImgDiv,
  Img,
  ImageCounterWrapper,
  ImageCounter,
} from '../data/emotion';

export interface SwipeImg {
  imageUrl: string;
  text: string;
}

interface MainPopularPostProps {
  images: SwipeImg[]; // 이미지 URL 배열을 prop으로 받음
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
    if (positionx < -20) {
      // 오른쪽으로 스와이프했을 때, 다음 이미지로 넘어가거나, 마지막 이미지에서는 첫 번째 이미지로 순환
      const nextImgCount = imgCount === images.length ? 1 : imgCount + 1;
      setImgCount(nextImgCount);
    } else if (positionx > 20) {
      // 왼쪽으로 스와이프했을 때, 이전 이미지로 넘어가거나, 첫 번째 이미지에서는 마지막 이미지로 순환
      const prevImgCount = imgCount === 1 ? images.length : imgCount - 1;
      setImgCount(prevImgCount);
    }
    setPositionx(0);
    setEndSwipe(true);
  };

  return (
    <>
      <Container>
        <p>인기 게시글</p>
        <PostImage>
          <Swipe onSwipeEnd={onSwipeEnd} onSwipeMove={onSwipeMove}>
            <StyledImgDiv
            // imgCount={imgCount}
            // positionx={positionx}
            // endSwipe={endSwipe}
            >
              {images.map((image, index) => {
                return (
                  <div
                    key={index}
                    style={{ minWidth: '100%', textAlign: 'center' }}
                  >
                    {' '}
                    {/* 화면 너비에 맞추어 이미지를 표시 */}
                    <Img src={image.imageUrl} alt={image.text} />
                    <p>{image.text}</p> {/* 텍스트 표시 */}
                  </div>
                );
              })}
            </StyledImgDiv>
          </Swipe>
        </PostImage>
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
