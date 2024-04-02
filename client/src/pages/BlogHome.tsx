import { useParams } from 'react-router-dom';
import BlogMain from '../components/BlogMain';
import { BlogHeader } from '../components/Headers';
import { items } from '../data/SearchData';

export default function BlogHome() {
  const { id } = useParams<{ id?: string }>();
  const itemId = parseInt(id ?? '0');

  const item = items.find((item) => item.id === itemId);

  return (
    <>
      <BlogHeader blogTitle={item?.blogTitle ?? ''} />
      <BlogMain />
    </>
  );
}
