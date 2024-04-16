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
import '../styles/Main.scss';
import { useEffect, useState } from 'react';
import { PostObject } from '../types';
import axios from 'axios';
import { PostLists } from '../components/Lists';

export default function Main() {
  const [popPost, setPopPost] = useState<PostObject[]>([
    {
      id: 0,
      postTitle: '',
      content: '',
      hashtag: [],
    },
  ]);
  const getPopPost = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/post/mainPop`,
    });
    console.log(res);
    setPopPost(res.data.result);
  };
  useEffect(() => {
    getPopPost();
  }, []);
  return (
    <div className="wrap">
      <MainHeader />
      <div className="main-slide">
        <MainPageImgSlide slides={slides} />
      </div>
      <p className="category main">인기 게시글</p>
      <div className="mainPostContainer" style={{ overflow: 'hidden' }}>
        <div className="popularPost popPost">
          <MainPopularPost postlist={popPost} />
        </div>
      </div>

      <div className="categoryContainer">
        <MainCategory items={items} ShowContent={true} showPagination={false} />
      </div>
      <Footer />
    </div>
  );
}
