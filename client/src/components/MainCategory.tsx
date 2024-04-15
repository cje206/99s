//게시글 더보기 누르면, 그 밑으로 게시글 12개까지만 나오게 하는거는 추가 구현해야함

import { useState } from 'react';
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
  const [selectedCategory, setSelectedCategory] = useState('일상');
  const [shownItems, setShownItems] = useState(6); // 초기에 보여줄 아이템 수
  const [showMoreButton, setShowMoreButton] = useState(true); // 더보기 버튼의 표시 여부
  const [currentPage, setCurrentPage] = useState(1);

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
  return (
    <>
      {ShowContent && (
        <ButtonWrapper>
          <StyledButton
            isSelected={selectedCategory === '일상'}
            onClick={() => setSelectedCategory('일상')}
          >
            일상
          </StyledButton>
          <StyledButton
            isSelected={selectedCategory === '스포츠'}
            onClick={() => setSelectedCategory('스포츠')}
          >
            스포츠
          </StyledButton>
          <StyledButton
            isSelected={selectedCategory === 'IT·과학'}
            onClick={() => setSelectedCategory('IT·과학')}
          >
            IT·과학
          </StyledButton>
          <StyledButton
            isSelected={selectedCategory === '시사·경제'}
            onClick={() => setSelectedCategory('시사·경제')}
          >
            시사·경제
          </StyledButton>
          <StyledButton
            isSelected={selectedCategory === '글로벌'}
            onClick={() => setSelectedCategory('글로벌')}
          >
            글로벌
          </StyledButton>
        </ButtonWrapper>
      )}
      <div className="postsContainer">
        {currentItems.map((item, index) => (
          <PostCategoryContainer
            key={index}
            style={{ margin: '20px 20px 0 20px' }}
          >
            <div className="categoryImg">
              <ImgCategory src={item.imageUrl} alt={item.title}></ImgCategory>
            </div>
            <TextDetail>
              <div className="postWriter">{item.writer}</div>
              <div
                className="postDate"
                style={{ color: '#7e7f81', fontSize: '13px' }}
              >
                {item.date}
              </div>
            </TextDetail>
            <PostDetail>
              <div className="postTitle">{item.title}</div>
              <div className="postContent">{item.content}</div>
            </PostDetail>
          </PostCategoryContainer>
        ))}
      </div>
      {ShowContent && showMoreButton && (
        <ButtonExtra onClick={handleShowMore}>
          <ButtonExtraStyled smallbtn={false} subscribebtn={false}>
            더보기
          </ButtonExtraStyled>
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
