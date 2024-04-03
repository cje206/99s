import { PostInfoContainer, ImgPost } from '../components/MainPopularStyle';
import { useState } from 'react';
import '../styles/MainPopularHorizontalPost.scss';
import Pagination from './Pagination';
export interface PopularInfo {
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
interface MainPopularInfoProps {
  data: PopularInfo[];
  showPagination: boolean;
  itemsPerPage?: number; //외부에서 설정
}
export default function MainPopularHorizontal({
  data,
  showPagination,
  itemsPerPage = 10,
}: MainPopularInfoProps) {
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 3; //실험차 3이고 나중에 10으로 변경하면 됌

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <>
      {currentItems.map((data, index) => (
        <PostInfoContainer key={index} style={{ margin: '20px 20px 0 20px' }}>
          <div className="contentWrapper">
            <div className="imageWrapper">
              <ImgPost src={data.imageUrl} alt={data.title}></ImgPost>
            </div>
            <div className="textWrapper">
              <div className="postTitle">{data.title}</div>
              <div className="textDetail">
                <div className="postWriter">{data.writer}</div>
                <div className="postDate">{data.date}</div>
              </div>
              <div className="postContent">{data.content}</div>
            </div>
          </div>
        </PostInfoContainer>
      ))}
      {showPagination && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
