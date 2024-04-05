import styled from 'styled-components';
import ProfileImage from './ProfileImage';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as IcoChat } from '../images/ico-chat.svg';
import { ReactComponent as IcoSubscribe } from '../images/ico-subscribe.svg';
import { ReactComponent as IcoLike } from '../images/ico-like.svg';
import { ReactComponent as IcoDarkmode } from '../images/ico-darkmode.svg';
import { ReactComponent as IcoSet } from '../images/ico-set.svg';
import { ReactComponent as IcoWrite } from '../images/ico-write.svg';

const SideBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 320px;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 150;
  .profileBox {
    position: relative;
    display: flex;
    padding: 50px 20px;
    background-color: #f6f7f9;
    .btnClose {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 24px;
    }
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
`;
export default function DefaultSidemenu() {
  const [user, setUser] = useAuth();
  useEffect(() => {
    setUser();
  }, []);
  return (
    <SideBox>
      <div className="profileBox">
        <img src="/images/ico-close.png" className="btnClose" />
        <ProfileImage id={user.id} />
        <div className="profileText">
          <Link to={`/blog/${user.id}`} className="blogLink">
            http://localhost:3000/blog/{user.id}
          </Link>
          <p className="profileName">{user.username}</p>
        </div>
      </div>
      <div className="menuBox">
        <div className="blogIcons">
          <IcoDarkmode stroke="#fbc02d" />
          <span>다크모드</span>
        </div>
      </div>
    </SideBox>
  );
}
