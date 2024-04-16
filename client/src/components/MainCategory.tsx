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
  const [selectedCategory, setSelectedCategory] = useState<string>('일상');
  const [shownItems, setShownItems] = useState(6); // 초기에 보여줄 아이템 수
  const [showMoreButton, setShowMoreButton] = useState(true); // 더보기 버튼의 표시 여부
  const [currentPage, setCurrentPage] = useState(1);
  const [isWide, setIsWide] = useState(window.innerWidth > 1160);

  const currentItems = items.slice(0, shownItems);
  const groupedItems = [...Array(Math.ceil(currentItems.length / 3))].map(
    (_, i) => currentItems.slice(i * 3, i * 3 + 3)
  );

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
            onClick={() => setSelectedCategory('일상')}
            style={
              selectedCategory === '일상'
                ? { background: '#fbc02d' }
                : { background: '#fff' }
            }
          >
            일상
          </StyledButton>
          <StyledButton
            onClick={() => setSelectedCategory('스포츠')}
            style={
              selectedCategory === '스포츠'
                ? { background: '#fbc02d' }
                : { background: '#fff' }
            }
          >
            스포츠
          </StyledButton>
          <StyledButton
            onClick={() => setSelectedCategory('IT&#183;과학')}
            style={
              selectedCategory === 'IT&#183;과학'
                ? { background: '#fbc02d' }
                : { background: '#fff' }
            }
          >
            IT&#183;과학
          </StyledButton>
          <StyledButton
            onClick={() => setSelectedCategory('시사&#183;경제')}
            style={
              selectedCategory === '시사&#183;경제'
                ? { background: '#fbc02d' }
                : { background: '#fff' }
            }
          >
            시사&#183;경제
          </StyledButton>
          <StyledButton
            onClick={() => setSelectedCategory('글로벌')}
            style={
              selectedCategory === '글로벌'
                ? { background: '#fbc02d' }
                : { background: '#fff' }
            }
          >
            글로벌
          </StyledButton>
        </ButtonWrapper>
      )}

      <div className="postsContainer">
        {isWide ? (
          <>
            {currentItems.map((item, index) => (
              <PostCategoryContainer
                key={index}
                style={{
                  width: 'calc(50% - 10px)',
                  flexWrap: 'wrap',
                }}
              >
                <div className="categoryImg">
                  <ImgCategory
                    src={item.imageUrl}
                    alt={item.title}
                  ></ImgCategory>
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
          </>
        ) : (
          <>
            {currentItems.map((item, index) => (
              <PostCategoryContainer
                key={index}
                style={{
                  minWidth: '100%',
                  boxSizing: 'border-box',
                  padding: '20px',
                }}
              >
                <div className="categoryImg">
                  <ImgCategory
                    src={item.imageUrl}
                    alt={item.title}
                  ></ImgCategory>
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
          </>
        )}
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
