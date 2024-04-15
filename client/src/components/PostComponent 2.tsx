import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BlogObject, PostObject } from '../types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { spawn } from 'child_process';
import ProfileImage from './ProfileImage';

const ContentInfo = styled.div`
  position: sticky;
  top: 70px;
  left: 0;
  border-bottom: 1px solid #e2e7e2;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background: #fff;
  z-index: 150;
  .ico {
    width: 24px;
    height: 24px;
    text-indent: -99999px;
    &.goBack {
      background: url('/images/ico-arrL.png') center/contain;
    }
    &.setting {
      background: url('/images/ico-setting.png') center/contain;
    }
  }
`;

const ContentTopContainer = styled.div`
  padding: 20px;
  border-bottom: 2px solid #e8e8e8;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 30px;
  }
`;

const ContentBox = styled.div`
  padding: 50px 20px 20px;
  border-bottom: 1px solid #e2e7e2;
  .hashtags {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    span {
      display: block;
      border: 1px solid #efefef;
      padding: 0 10px;
      font-size: 14px;
      line-height: 2;
      border-radius: 20px;
      color: #777;
      margin-right: 10px;
    }
  }
`;
export function PostTop({ children }: { children: string }) {
  const navigate = useNavigate();
  return (
    <ContentInfo>
      <button className="ico goBack" onClick={() => navigate(-1)}>
        뒤로가기
      </button>
      <div>{children}</div>
      <button className="ico setting">게시글 설정</button>
    </ContentInfo>
  );
}

export function PostTitle({
  post,
  blog,
}: {
  post: PostObject;
  blog: BlogObject;
}) {
  const [categoryName, setCategoryName] = useState<string>('카테고리 없음');
  const getTime = (): string => {
    if (post.createdAt) {
      const writtenTime = new Date(post.createdAt);
      return `${writtenTime.getFullYear()}-${
        writtenTime.getMonth() + 1
      }-${writtenTime.getDay()}`;
    }
    return '';
  };
  const getCategory = async () => {
    if (post.categoryId) {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:8000/api/blog/findCategory',
        params: { id: post.categoryId },
      });
      console.log(res);
      setCategoryName(res.data.result.categoryName);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <ContentTopContainer>
      <div className="categoryName">{categoryName}</div>
      <div className="contentTitle">{post.postTitle}</div>
      <div className="contentDetail">
        <ProfileImage id={blog?.memberId || 1} imgwidth="50px" />
        <div className="block">
          <div className="writer">작성자</div>
          <div className="block1">
            <div className="date">{getTime()} · </div>
            <div className="view">조회 조회수</div>
          </div>
        </div>
        <button className="shareBtn">
          <img
            className="shareImg"
            src={`${process.env.PUBLIC_URL}/images/ico-share.png`}
            alt="공유하기버튼"
          />
        </button>
      </div>
    </ContentTopContainer>
  );
}

export function PostContent({
  content,
  hashtag,
}: {
  content: string;
  hashtag: any[];
}) {
  return (
    <ContentBox>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
      ></div>
      <div className="hashtags">
        {hashtag?.map((value, id) => (
          <span key={id}>{value}</span>
        ))}
      </div>
    </ContentBox>
  );
}

export function OtherPost() {
  return <div></div>;
}

export function WriterProfile() {
  return <div></div>;
}
