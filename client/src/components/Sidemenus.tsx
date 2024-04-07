import styled from 'styled-components';
import ProfileImage from './ProfileImage';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ReactComponent as IcoChat } from '../images/ico-chat.svg';
import { ReactComponent as IcoSubscribe } from '../images/ico-subscribe.svg';
import { ReactComponent as IcoLike } from '../images/ico-like.svg';
import { ReactComponent as IcoDarkmode } from '../images/ico-darkmode.svg';
import { ReactComponent as IcoSet } from '../images/ico-set.svg';
import { ReactComponent as IcoWrite } from '../images/ico-write.svg';
import { ReactComponent as IcoLogout } from '../images/ico-logout.svg';
import { ToggleBtn } from './Btns';
import { SetMenu } from './Settings';
import { ArrList } from './Lists';
import axios from 'axios';

const SideBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 320px;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 150;
  .btnClose {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
  }
  .profileBox {
    position: relative;
    display: flex;
    padding: 50px 20px;
    background-color: #f6f7f9;
    .profileText {
      width: 80%;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      .blogLink {
        display: block;
        color: #777;
        font-size: 12px;
        margin-bottom: 10px;
      }
    }
  }
  .blogIcons {
    padding: 15px 20px;
    border-bottom: 1px solid #eaf1ea;
    box-sizing: border-box;
    svg {
      margin-right: 10px;
    }
    .iconBox {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      padding-left: 4px;
      justify-content: space-between;
      align-items: center;
    }
    &.logout {
      position: absolute;
      bottom: 0;
      width: 100%;
      border-top: 1px solid #eaf1ea;
    }
  }
`;
export function DefaultSidemenu({ func }: { func?: () => void }) {
  const location = useLocation();
  const [user, setUser] = useAuth();
  const [darkmode, setDarkmode] = useState<Boolean>(false);
  const logoutFun = () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) {
      return;
    }
    localStorage.clear();
    document.location.reload();
  };
  const applyDark = () => {
    if (darkmode) {
      localStorage.setItem('darkmode', 'on');
    } else {
      localStorage.removeItem('darkmode');
    }
  };
  useEffect(() => {
    setUser();
    if (localStorage.getItem('darkmode') === 'on') {
      setDarkmode(true);
    }
  }, []);
  useEffect(() => {
    applyDark();
  }, [darkmode]);
  return (
    <SideBox>
      <div className="profileBox">
        <img src="/images/ico-close.png" className="btnClose" onClick={func} />
        <ProfileImage id={user.id || 0} />
        {user.id ? (
          <div className="profileText">
            <Link to={`/blog/${user.id}`} className="blogLink">
              http://localhost:3000/blog/{user.id}
            </Link>
            <p className="profileName">{user.username}</p>
          </div>
        ) : (
          <Link to="/signup" className="profileText">
            로그인/회원가입
          </Link>
        )}
      </div>
      <div className="menuBox">
        <div
          className="blogIcons"
          onClick={() => setDarkmode(!darkmode)}
          style={{ cursor: 'pointer' }}
        >
          <IcoDarkmode stroke="#fbc02d" />
          <div className="iconBox">
            <p>다크모드</p>
            <ToggleBtn active={Boolean(darkmode)} />
          </div>
        </div>
        <Link to="/post/write" className="blogIcons">
          <IcoWrite stroke="#fbc02d" />
          <span>글 작성하기</span>
        </Link>
        <div className="blogIcons">
          <IcoSubscribe stroke="#fbc02d" />
          <span>구독</span>
        </div>
        <div className="blogIcons">
          <IcoLike stroke="#fbc02d" fill="none" />
          <span>좋아요</span>
        </div>
        <Link to="/setting" className="blogIcons">
          <IcoSet stroke="#fbc02d" />
          <span>설정</span>
        </Link>
        <Link to="/chat" className="blogIcons">
          <IcoChat stroke="#fbc02d" />
          <span>메세지</span>
        </Link>
        {Boolean(localStorage.getItem('token')) && (
          <div className="blogIcons logout" onClick={logoutFun}>
            <IcoLogout stroke="#fbc02d" />
            <span>로그아웃</span>
          </div>
        )}
      </div>
    </SideBox>
  );
}

export function SetSidemenu({ func }: { func?: () => void }) {
  const location = useLocation();
  const [url, setUrl] = useState(location.pathname);
  useEffect(() => {
    if (url !== location.pathname) {
      document.location.reload();
    }
  }, [location.pathname]);
  return (
    <SideBox>
      <img src="/images/ico-close.png" className="btnClose" onClick={func} />
      <div className="body" style={{ paddingTop: '50px' }}>
        {/* <SetMenu /> */}
        <Link to="/setting">
          <ArrList>설정 홈</ArrList>
        </Link>
        <Link to="/setting/post">
          <ArrList>글 관리</ArrList>
        </Link>
        <Link to="/setting/category">
          <ArrList>카테고리 관리</ArrList>
        </Link>
        <Link to="/setting/info">
          <ArrList>개인정보 수정</ArrList>
        </Link>
        <Link to="/setting/blog">
          <ArrList>블로그 편집</ArrList>
        </Link>
      </div>
    </SideBox>
  );
}

export function BlogSidemenu({ func }: { func?: () => void }) {
  const location = useLocation();
  const { id } = useParams<{ id?: string }>();
  const [url, setUrl] = useState(location.pathname);
  const [list, setList] = useState<any[]>();
  const getCategory = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/blog/getCategory',
      params: { memberId: Number(id) },
    });
    console.log(res);
    setList(res.data.result);
  };
  useEffect(() => {
    getCategory();
  }, []);
  useEffect(() => {
    if (url !== location.pathname) {
      document.location.reload();
    }
  }, [location.pathname]);
  return (
    <SideBox>
      <img src="/images/ico-close.png" className="btnClose" onClick={func} />
      <div className="body" style={{ paddingTop: '50px' }}>
        <Link to={`/blog/${id}/category`}>
          <ArrList>전체 글</ArrList>
        </Link>
        {list?.length === 0 ||
          list?.map((data) => {
            const { categoryName, group } = data;
            return (
              <Link to={`/blog/${id}/category/${data.id}`} key={data.id}>
                <ArrList>{categoryName}</ArrList>
              </Link>
            );
          })}
      </div>
    </SideBox>
  );
}
