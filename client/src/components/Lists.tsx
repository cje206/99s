import styled from 'styled-components';
import ProfileImage from './ProfileImage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ArrBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  .title {
    line-height: 50px;
    font-weight: 700;
  }
  .ico-arrR {
    width: 24px;
    height: 50px;
    background: url('/images/ico-arrR.png') no-repeat center/contain;
  }
`;

const WriterContainer = styled.div`
  display: flex;
  padding: 20px 0;
  align-items: center;
  border-bottom: 1px solid #e2e7e2;
  .textBox {
    margin-left: 10px;
  }
  .nickname {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .countBox {
    display: flex;
    .count {
      font-size: 12px;
      color: #777;
    }
  }
`;
const PostContainter = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #e2e7e2;
  .title {
    font-weight: 700;
    margin-bottom: 10px;
  }
  .content {
    color: #777;
    margin-bottom: 14px;
  }
  .writerInfo {
    display: flex;
    align-items: center;
    .writerText {
      margin-left: 10px;
      .nickname {
        margin-bottom: 6px;
      }
      .written {
        font-size: 12px;
        color: #777;
      }
    }
  }
`;
interface WriterInfoObj {
  memberId: number;
  nickname: string;
  subCount: number;
  postCount: number;
}
interface PostInfoObj {
  memberId: number;
  blogId: number;
  nickname: string;
  title: string;
  content: string;
  createdAt: string;
}
export function ArrList({ children }: { children: string }) {
  return (
    <ArrBox>
      <div className="title">{children}</div>
      <div className="ico-arrR"></div>
    </ArrBox>
  );
}
export function WriterList({ id }: { id: number }) {
  const [info, setInfo] = useState<WriterInfoObj>({
    memberId: 0,
    nickname: '',
    subCount: 0,
    postCount: 0,
  });
  const getInfo = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/sub/getInfo',
      params: { blogId: id },
    });
    const { memberId, nickname, subscribe, postList } = res.data.result;
    setInfo({
      memberId,
      nickname,
      subCount: subscribe.length,
      postCount: postList.length,
    });
  };
  useEffect(() => {
    console.log(info);
  }, [info]);
  useEffect(() => {
    if (id && id !== 0) {
      getInfo();
    }
  }, [id]);
  return (
    <Link to={`/blog/${id}`}>
      <WriterContainer>
        <ProfileImage id={info.memberId} imgwidth="50px" />
        <div className="textBox">
          <div className="nickname">{info.nickname}</div>
          <div className="countBox">
            <p className="count">구독자 {info.subCount}명 · </p>
            <p className="count">게시글 {info.subCount}개</p>
          </div>
        </div>
      </WriterContainer>
    </Link>
  );
}
export function PostList({ id }: { id: number }) {
  const [info, setInfo] = useState<PostInfoObj>({
    memberId: 0,
    blogId: 0,
    nickname: '',
    title: '',
    content: '',
    createdAt: '',
  });
  const getInfo = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/like/getInfo',
      params: { postId: id },
    });
    setInfo(res.data.result);
  };
  useEffect(() => {
    console.log(info);
  }, [info]);
  useEffect(() => {
    if (id && id !== 0) {
      getInfo();
    }
  }, [id]);
  return (
    <Link to={`/blog/${info.blogId}/${id}`}>
      <PostContainter>
        <div className="title">{info.title}</div>
        <div className="content">
          {info.content.replaceAll('<p>', '').replaceAll('</p>', '')}
        </div>
        <div className="writerInfo">
          <ProfileImage id={info.memberId} imgwidth="40px" />
          <div className="writerText">
            <p className="nickname">{info.nickname}</p>
            <p className="written">{info.createdAt}</p>
          </div>
        </div>
      </PostContainter>
    </Link>
  );
}
