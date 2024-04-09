import { slides } from '../data/ImgData';
import { images } from '../data/PopularPostData';
import MainPageImgSlide from '../components/MainPageImgSlide';
import MainPopularPost from '../components/MainPopularPost';
import MainPopularHorizontal from '../components/MainPopularHorizontal';
import { data } from '../data/PopularHorizontalPost';
import MainCategory from '../components/MainCategory';
import { items } from '../data/MainCategory';
import { MainHeader } from '../components/Headers';
import '../styles/common.scss';
import Footer from '../components/Footer';

export default function Main() {
  return (
    <div className="wrap">
      <MainHeader />
      <div className="main-slide">
        <MainPageImgSlide slides={slides} />
      </div>
      <div className="popularPost">
        <MainPopularPost images={images} />
      </div>
      <div className="popularInfo">
        <MainPopularHorizontal
          data={data}
          showPagination={false}
          itemsPerPage={4}
        />
      </div>
      <div>
        <MainCategory items={items} ShowContent={true} showPagination={false} />
      </div>
      <Footer />
    </div>
  );
}
