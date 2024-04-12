import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BlogHeaderid } from '../components/Headers';
import styled from 'styled-components';
import { PostObject } from '../types';
import DOMPurify from 'isomorphic-dompurify';

const ContentBox = styled.div`
  border-bottom: 1px solid #e2e7e2;
  margin-bottom: 20px;
  .title {
    margin-bottom: 10px;
  }
  .content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #777;
    font-size: 14px;
    margin-bottom: 20px;
    line-height: 1.3;
  }
`;

export default function Category() {
  const { id, categoryId } = useParams<{ id: string; categoryId: string }>();
  const [post, setPost] = useState<PostObject[]>();
  const getPost = async () => {
    let data;
    if (categoryId) {
      data = { categoryId };
    } else {
      data = { id };
    }
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/post/category',
      params: data,
    });
    console.log(res);
    setPost(res.data.result);
  };
  useEffect(() => {
    getPost();
  }, [categoryId]);
  return (
    <div className="wrap">
      <BlogHeaderid id={Number(id)} />
      <div className="body">
        {post?.map((val) => (
          <ContentBox
            key={val.id}
            onClick={() => (document.location.href = `/blog/${id}/${val.id}`)}
          >
            <div className="title">{val.postTitle}</div>
            <div className="content">
              {val.content.replaceAll('<p>', '').replaceAll('</p>', '')}
            </div>
          </ContentBox>
        ))}
      </div>
    </div>
  );
}
