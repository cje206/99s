import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BlogObject, OtherPostObj, PostObject, ThemeStyle } from '../types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import ProfileImage from './ProfileImage';
import { ReactComponent as IcoLike } from '../images/ico-like.svg';
import { ButtonExtraStyled } from './MainPopularStyle';
import '../styles/Content.scss';
import { PostSetBtn } from './Btns';

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
  line-height: 1.5;
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
      margin: 0 10px 10px 0;
    }
  }
`;

const FlexBox = styled.div`
  display: flex;
  border-bottom: 1px solid #e2e7e2;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  line-height: 50px;
  .likeContent {
    display: flex;
    align-items: center;
    .likeIcon {
      margin-right: 10px;
    }
    .likesContainer {
      display: flex;
      align-items: center;
      .likeImg {
        display: flex;
        margin-right: 20px;
        .imgBox {
          border: 6px solid #fff;
          margin-right: -15px;
        }
      }
    }
  }
`;
const WriterInfo = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .block2 {
    margin-left: 15px;
    flex-direction: column;
    flex-grow: 1;
    .writer {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .subscribe {
      color: #777777;
      font-size: 13px;
    }
  }
  .subscribeBtn {
    width: 100px;
    line-height: 30px;
    border-radius: 20px;
  }
`;

const OtherBox = styled.div`
  display: flex;
  padding: 0 20px;
  border-bottom: 1px solid #e2e7e2;
  line-height: 50px;
  .otherName {
    font-weight: 700;
    margin-right: 10px;
  }
`;
export function PostTop({ children }: { children: string }) {
  const [setActive, setSetActive] = useState<Boolean>(false);
  const navigate = useNavigate();
  return (
    <ContentInfo>
      <button className="ico goBack" onClick={() => navigate(-1)}>
        뒤로가기
      </button>
      <div>{children}</div>
      <button className="ico setting" onClick={() => setSetActive(!setActive)}>
        게시글 설정
      </button>
      {setActive && <PostSetBtn />}
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
        url: `${process.env.REACT_APP_HOST}/api/blog/findCategory`,
        params: { id: post.categoryId },
      });
      setCategoryName(res.data.result.categoryName);
    }
  };
  useEffect(() => {
    getCategory();
  }, [post]);
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

export function PostLike({
  userid,
  memberid,
  postid,
  theme,
}: {
  userid?: number;
  memberid: number;
  postid: number;
  theme: ThemeStyle;
}) {
  const [like, setLike] = useState<Boolean>(false);
  const [likeList, setLikeList] = useState({
    count: 0,
    memberList: [],
  });
  const checkLike = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/post/checkLike`,
      params: { memberId: userid, postId: postid },
    });
    setLike(res.data.success);
  };
  const getLike = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/post/findLike`,
      params: { postId: postid },
    });
    setLikeList(res.data.result);
  };
  const toggleLike = async () => {
    if (userid) {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/post/clickLike`,
        data: { memberId: userid, postId: postid },
      });
      setLike(!like);
    } else {
      if (window.confirm('로그인 후 이용 가능합니다.')) {
        document.location.href = '/signup';
      }
    }
  };
  useEffect(() => {
    if (memberid) {
      if (userid) {
        checkLike();
      }
      getLike();
    }
  }, [memberid]);
  useEffect(() => {
    if (memberid) {
      if (userid) {
        checkLike();
      }
      getLike();
    }
  }, [userid]);
  useEffect(() => {
    getLike();
  }, [like]);
  return (
    <FlexBox>
      <div className="likeContent">
        {like ? (
          <IcoLike
            className="likeIcon"
            fill={theme.background}
            onClick={toggleLike}
          ></IcoLike>
        ) : (
          <IcoLike
            className="likeIcon"
            fill="none"
            stroke="#333"
            onClick={toggleLike}
          ></IcoLike>
        )}
        <div className="likesContainer">
          {/* 좋아요 누른 사람들 이미지 3개까지 보여주게 하기 */}
          <div className="likeImg">
            {likeList.memberList.length >= 1 && (
              <ProfileImage id={likeList.memberList[0]} imgwidth="28px" />
            )}
            {likeList.memberList.length >= 2 && (
              <ProfileImage id={likeList.memberList[1]} imgwidth="28px" />
            )}
            {likeList.memberList.length >= 3 && (
              <ProfileImage id={likeList.memberList[2]} imgwidth="28px" />
            )}
          </div>

          <div className="viewCount">{`${likeList.count}명이 좋아합니다.`}</div>
          {/* </div> */}
        </div>
      </div>
      <button className="shareBtn">
        <img
          className="shareImg"
          src={`${process.env.PUBLIC_URL}/images/ico-share.png`}
          alt="공유하기버튼"
        />
      </button>
    </FlexBox>
  );
}

export function OtherPost({
  children,
  title,
  linkto,
}: {
  children: string;
  title: string;
  linkto: string;
}) {
  const navigate = () => {
    document.location.href = linkto;
  };
  return (
    <OtherBox onClick={navigate}>
      <div className="otherName">{children}</div>
      <div className="otherTitle">{title}</div>
    </OtherBox>
  );
}

export function WriterProfile({
  userid,
  blog,
  theme,
}: {
  userid?: number;
  blog: BlogObject;
  theme: ThemeStyle;
}) {
  const [subscribe, setSubscribe] = useState<Boolean>(false);
  const checkSub = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/blog/checkSub`,
      params: { memberId: userid, blogId: blog.id },
    });
    setSubscribe(res.data.success);
  };

  const toggleSubscribe = async () => {
    if (userid) {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/blog/clickSub`,
        data: { memberId: userid, blogId: blog.id },
      });
      setSubscribe(!subscribe);
    }
  };
  useEffect(() => {
    if (userid) {
      checkSub();
    }
  }, [userid]);
  return (
    <WriterInfo style={{ background: theme.color }}>
      <ProfileImage id={blog.id} imgwidth="60px" />
      <div className="block2">
        <div className="writer">{blog.nickname} </div>
        <div className="subscribe">구독자 {blog.subscribeCount || 0}명</div>
      </div>
      {blog.memberId !== userid && (
        <>
          {subscribe ? (
            <button
              onClick={toggleSubscribe}
              className="subscribeBtn"
              style={{
                color: theme.background,
                border: `1px solid ${theme.background}`,
              }}
            >
              구독 중
            </button>
          ) : (
            <button
              onClick={toggleSubscribe}
              className="subscribeBtn"
              style={theme}
            >
              구독하기
            </button>
          )}
        </>
      )}
    </WriterInfo>
  );
}
