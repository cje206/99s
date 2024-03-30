import { PostInfoContainer, ImgPost } from '../components/MainPopularStyle';
import '../styles/MainPopularHorizontalPost.scss';
export interface PopularInfo {
  imageUrl: string;
  title: string;
  writer: string;
  date: string;
}
interface MainPopularInfoProps {
  data: PopularInfo[];
}
export default function MainPopularHorizontal({ data }: MainPopularInfoProps) {
  return (
    <>
      {data.map((data, index) => (
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
            </div>
          </div>
        </PostInfoContainer>
      ))}
    </>
  );
}
