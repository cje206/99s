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
export interface CategoryInfo {
  imageUrl: string;
  title: string;
  writer: string;
  date: string;
  content: string;
}
interface MainCategoryProps {
  items: CategoryInfo[];
}
export default function MainCategory({ items }: MainCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState('일상');
  const [shownItems, setShownItems] = useState(4); // 초기에 보여줄 아이템 수
  const [showMoreButton, setShowMoreButton] = useState(true); // 더보기 버튼의 표시 여부

  const handleShowMore = () => {
    const newShownItems = shownItems + 4; //더보기 +4개씩 증가
    setShownItems(newShownItems);

    // shownItems가 12개 이상이 되면 더보기 버튼을 숨김
    if (newShownItems >= 12) {
      setShowMoreButton(false);
    }
  };
  return (
    <>
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
      {items.map((item, index) => (
        <PostCategoryContainer
          key={index}
          style={{ margin: '20px 20px 0 20px' }}
        >
          <div className="imageWrapper">
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
      {showMoreButton && (
        <ButtonExtra onClick={handleShowMore}>
          <ButtonExtraStyled>게시글 더보기</ButtonExtraStyled>
        </ButtonExtra>
      )}
    </>
  );
}
