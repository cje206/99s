import { useParams } from 'react-router-dom';
import { BlogHeader } from '../components/Headers';
import { items } from '../data/SearchData';
import Content from '../components/Content';
import CommentComponent from '../components/BlogComment';

export default function ContentPage() {
  const { id } = useParams<{ id?: string }>();
  const itemId = parseInt(id ?? '0');
  const item = items.find((item) => item.id === itemId);

  return (
    <>
      <BlogHeader blogTitle={item?.blogTitle ?? ''} />
      <Content />
      <CommentComponent />
    </>
  );
}
