//게시글 더보기 누르면, 그 밑으로 게시글 12개까지만 나오게 하는거는 추가 구현해야함

import { useEffect, useState } from 'react';
import {
  PostCategoryContainer,
  ImgCategory,
  ButtonWrapper,
  StyledButton,
  TextDetail,
  PostDetail,
  ButtonExtraStyled,
  ButtonExtra,
} from '../components/MainPopularStyle';
import '../styles/MainCategory.scss';
import Pagination from './Pagination';
import axios from 'axios';
import { PostObject } from '../types';
import { DesktopBlogMain } from './BlogComponent';
import { PostLists } from './Lists';
export interface CategoryInfo {
  imageUrl?: string;
  title?: string;
  subscribe?: number;
  postNum?: number;
  writer?: string;
  date?: string;
  content?: string;
  writerImgUrl?: string;
  nickname?: string;
  blogintro?: string;
  id: number;
  blogTitle?: string;
  view?: number;
  postId?: number;
}
interface MainCategoryProps {
  items: CategoryInfo[];
  ShowContent: boolean;
  showPagination: boolean;
  itemsPerPage?: number;
  // StyledButton: boolean;
  // ButtonExtraStyled: boolean;
}
export default function MainCategory({
  items,
  ShowContent,
  showPagination,
}: MainCategoryProps) {
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [shownItems, setShownItems] = useState(6); // 초기에 보여줄 아이템 수
  const [showMoreButton, setShowMoreButton] = useState(true); // 더보기 버튼의 표시 여부
  const [currentPage, setCurrentPage] = useState(1);
  const [newPost, setNewPost] = useState<PostObject[]>([
    {
      id: 0,
      postTitle: '',
      content: '',
      hashtag: [],
    },
  ]);

  const currentItems = items.slice(0, shownItems);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleShowMore = () => {
    const newShownItems = shownItems + 6; //더보기 +6개씩 증가
    setShownItems(newShownItems);

    // shownItems가 12개 이상이 되면 더보기 버튼을 숨김
    if (newShownItems >= 12) {
      setShowMoreButton(false);
    }
  };
  const getNewPost = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/post/mainNew`,
    });
    console.log(res.data.result);
    setNewPost(res.data.result);
  };
  useEffect(() => {
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
    getNewPost();
  }, []);
  return (
    <>
      <div className="body postsContainer">
        {newPost.map((data, idx) => {
          if (idx < shownItems) {
            return <PostLists key={data.id} post={data} vertical={true} />;
          }
        })}
      </div>
      {ShowContent && showMoreButton && (
        <ButtonExtra onClick={handleShowMore} style={{ marginBottom: '40px' }}>
          <ButtonExtraStyled>더보기</ButtonExtraStyled>
        </ButtonExtra>
      )}
      {showPagination && (
        <Pagination
          itemsPerPage={shownItems}
          totalItems={items.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
