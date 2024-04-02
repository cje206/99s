import styled from 'styled-components';

const BlogMainContainer = styled.div`
  display: flex;
`;
const WriterImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
  /* text-align: center; */
`;
const BlogDetail = styled.div`
  flex-direction: column;
`;
const WriterNick = styled.div`
  font-weight: bold;
  font-size: 15px;
`;
const BlogIntro = styled.div`
  font-size: 13px;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 표시할 최대 행 수 */
  overflow: hidden;
  max-width: 100%;
  color: #7e7f81;
`;

interface Info {
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
}

interface BlogMainProps {
  searchDataItems: Info[];
}

export default function BlogMain({ searchDataItems }: BlogMainProps) {
  console.log(searchDataItems);
  return (
    <>
      {searchDataItems.map((item, index) => {
        <BlogMainContainer key={index}>
          <WriterImg src={item.writerImgUrl}></WriterImg>
          <BlogDetail>
            <WriterNick>{item.nickname}</WriterNick>
            <BlogIntro>{item.blogintro}</BlogIntro>
          </BlogDetail>
        </BlogMainContainer>;
      })}
    </>
  );
}
