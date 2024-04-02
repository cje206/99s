import BlogMain from '../components/BlogMain';
import { BlogHeader } from '../components/Headers';
import { items } from '../data/SearchData';

export default function BlogHome() {
  return (
    <>
      <BlogHeader />
      <BlogMain searchDataItems={items} />
    </>
  );
}
