import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import '../styles/BlogMain.scss';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { ReactComponent as IcoChat } from '../images/ico-chat.svg';
import { ReactComponent as IcoSubscribe } from '../images/ico-subscribe.svg';
import { ReactComponent as IcoPost } from '../images/ico-post.svg';
import { ReactComponent as IcoShare } from '../images/ico-share.svg';
import { ThemeStyle } from '../types';
import ProfileImage from '../components/ProfileImage';

const BlogMainContainer = styled.div<{ link?: string }>`
  display: flex;
  margin: 20px 20px 0 20px;
  .imgBox {
    width: 20%;
    border-radius: 50%;
    overflow: hidden;
  }
`;

const BlogDetail = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;
  box-sizing: border-box;
  .nickName {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .blogInfo {
    font-size: 14px;
    line-height: 1.2;
    color: #7e7f81;
  }
`;

interface Blog {
  id: number;
  memberId: number;
  nickname: string;
  blogTitle: string;
  theme: number;
  view: number;
  subscribeCount: number;
  subscribeList: number[] | [];
  fontColor: string;
  bgColor: string;
  writerImg?: string;
  blogInfo?: string;
}

export default function BlogMain({
  bloginfo,
  theme,
}: {
  bloginfo: Blog;
  theme: ThemeStyle;
}) {
  const { id } = useParams<{ id?: string }>();
  const [user, setUser] = useAuth();

  useEffect(() => {
    setUser();
  }, []);

  return (
    <div className="blog">
      <BlogMainContainer>
        <ProfileImage id={Number(id)} />
        <BlogDetail>
          <div className="nickName">{bloginfo.nickname}</div>
          <div className="blogInfo">{bloginfo.blogInfo}</div>
        </BlogDetail>
      </BlogMainContainer>
      <div className="hr" style={theme}>
        <div className="linkChat">
          {user.id === bloginfo.memberId ? (
            <Link to="/chat" className="blogIcons">
              <IcoChat stroke={theme.color}></IcoChat>
              <span>채팅 목록</span>
            </Link>
          ) : (
            <Link
              to="/chat"
              className="blogIcons"
              onClick={() => localStorage.setItem('chat', id || '0')}
            >
              <IcoChat stroke={theme.color}></IcoChat>
              <span>1:1 채팅</span>
            </Link>
          )}
        </div>
        <div className="react">
          <div className="blogIcons subscribeCount">
            <IcoSubscribe stroke={theme.color}></IcoSubscribe>
            <span>{bloginfo.subscribeCount}</span>
          </div>
          <div className="blogIcons postCount">
            <IcoPost stroke={theme.color}></IcoPost>
            <span>10</span>
          </div>
          <div className="blogIcons share">
            <IcoShare stroke={theme.color}></IcoShare>
          </div>
        </div>
      </div>
    </div>
  );
}
