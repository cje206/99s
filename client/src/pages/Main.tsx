import { slides } from '../data/ImgData';
import { images } from '../data/PopularPostData';
import MainPageImgSlide from '../components/MainPageImgSlide';
import MainPopularPost from '../components/MainPopularPost';

export default function Main() {
  return (
    <>
      <div className="main-slide">
        <MainPageImgSlide slides={slides} />
      </div>
      <div className="popularPost">
        <MainPopularPost images={images} />
      </div>
    </>
  );
}