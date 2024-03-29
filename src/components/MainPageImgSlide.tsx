import { Link } from 'react-router-dom';
import '../styles/MainPageImgSlide.scss';
import { useState, useEffect } from 'react';

export interface Slide {
  imageUrl: string;
  text: string;
}

interface MainPageImgSlideProps {
  slides: Slide[]; // 전체 슬라이드 배열을 prop으로 받음
}

export default function MainPageImgSlide({ slides }: MainPageImgSlideProps) {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // 3초마다 슬라이드 변경
    return () => clearInterval(timer);
  }, [slides.length]); // slides.length를 의존성 배열에 추가

  if (slides.length === 0) {
    return <div>슬라이드가 없습니다.</div>;
  }

  return (
    <>
      <p
        style={{
          width: '70%',
          wordWrap: 'break-word',
          margin: '0 auto',
          fontWeight: 'bold',
        }}
      >
        {slides[currentIndex].text}
      </p>
      <button>
        <Link to=""></Link>자세히 보기
      </button>
      <div
        className="imgBorder"
        style={{ backgroundImage: `url(${slides[currentIndex].imageUrl})` }}
      >
        {/* <img src={slides[currentIndex].imageUrl} alt="이미지 슬라이드" /> */}
      </div>
    </>
  );
}
