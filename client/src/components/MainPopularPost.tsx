import '../styles/MainPopularPost.scss';
import { useEffect, useState } from 'react';
import Swipe from 'react-easy-swipe';
import {
  Container,
  PostImage,
  StyledImgDiv,
  Img,
  ImageCounterWrapper,
  ImageCounter,
  SlideContainer,
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
  const [isWide, setIsWide] = useState(window.innerWidth > 1160);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > 1160);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((preIndex) => (preIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      <Container>
        {isWide ? (
          <SlideContainer>
            {images.map((image, index) => (
              <div
                className="slidePost"
                style={{
                  display: index === currentIndex ? 'block' : 'none',
                  width: '100%',
                }}
                key={index}
              >
                <Img
                  style={{ borderRadius: '20px' }}
                  src={image.imageUrl}
                  alt={image.title}
                />
              </div>
            ))}
            {/* <div className="postInfo"> */}
            <div className="postTitle block">{images[currentIndex].title}</div>
            <div className="postWriterInfo">
              {images[currentIndex].writerImgUrl && (
                <img
                  className="writerImg"
                  src={images[currentIndex].writerImgUrl}
                  alt="작성자 사진"
                />
              )}
              <div className="writerDetail">
                <div className="writerDetail block">
                  {images[currentIndex].writer}
                </div>
                <div
                  style={{
                    color: '#7E7F81',
                    fontSize: '13px',
                  }}
                >
                  {images[currentIndex].Date}
                </div>
              </div>
            </div>
            {/* </div> */}
          </SlideContainer>
        ) : (
          <>
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
                        className="popularPost"
                        key={index}
                        style={{
                          minWidth: '100%',
                          textAlign: 'center',
                        }}
                      >
                        {' '}
                        <Img src={image.imageUrl}></Img>
                      </div>
                    );
                  })}
                </StyledImgDiv>
              </Swipe>
            </PostImage>
            <div className="postTitle popular">
              {images[imgCount - 1].title}
            </div>
            <div className="postWriterInfo">
              {images[imgCount - 1].writerImgUrl && (
                <img
                  className="writerImg"
                  src={images[imgCount - 1].writerImgUrl}
                  alt="작성자 사진"
                />
              )}
              <div className="writerDetail">
                <div className="writerDetail block">
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
                    <ImageCounter
                      key={index}
                      index={index}
                      imgCount={imgCount}
                    />
                  );
                })}
              </ImageCounterWrapper>
            )}
          </>
        )}
      </Container>
    </>
  );
}
