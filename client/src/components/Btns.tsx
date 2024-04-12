import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as IcoWrite } from '../images/ico-write.svg';
import { ThemeStyle } from '../types';
import useAuth from '../hooks/useAuth';

const BoxStyle = styled.button<{ btncolor: string }>`
  border: 2px solid #d9dbdf;
  padding: 0;
  border-radius: 50px;
  display: flex;
  cursor: pointer;
  .btnText {
    display: inline-block;
    width: 20px;
    line-height: 20px;
    background: #7e7f81;
    color: #7e7f81;
    border-radius: 50%;
    margin: 2px;
    font-size: 10px;
    &.off {
      background: transparent;
      margin-left: 5px;
      text-align: center;
      text-indent: -8px;
    }
    &.on {
      color: transparent;
      text-indent: 6px;
    }
  }
  &.active {
    .on {
      color: #7e7f81;
      background: transparent;
    }
    .off {
      color: transparent;
      background: ${(props) => props.btncolor};
    }
  }
`;

const NewPostBox = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: block;
  width: 50px;
  height: 50px;
  background: #333;
  z-index: 170;
  border-radius: 50%;
`;

const PostSetBox = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  border: 2px solid #e2e7e2;
  border-radius: 10px;
  background: #fff;
  z-index: 170;
  padding: 10px;
  .btn {
    line-height: 40px;
    border-bottom: 1px solid #e2e7e2;
  }
  .darkmodebtn {
    display: flex;
    align-items: center;
    .text {
      line-height: 40px;
      margin-right: 10px;
    }
  }
`;

export function ToggleBtn({
  active,
  btncolor,
}: {
  active: boolean;
  btncolor?: string;
}) {
  const OnStyle = () => {
    return (
      <BoxStyle className="active" btncolor={btncolor || '#fbc20d'}>
        <span className="btnText on">ON</span>
        <span className="btnText off">OFF</span>
      </BoxStyle>
    );
  };
  const OffStyle = () => {
    return (
      <BoxStyle btncolor={btncolor || '#fbc20d'}>
        <span className="btnText on">ON</span>
        <span className="btnText off">OFF</span>
      </BoxStyle>
    );
  };
  if (active) {
    return <OnStyle />;
  } else {
    return <OffStyle />;
  }
}

export function NewPostBtn({ theme }: { theme: ThemeStyle }) {
  const navigate = useNavigate();
  return (
    <NewPostBox onClick={() => navigate('/post/write')} style={theme}>
      <IcoWrite stroke={theme.color} />
    </NewPostBox>
  );
}

export function PostSetBtn() {
  const [user, setUser] = useAuth();
  const { id, postId } = useParams<{ postId: string; id: string }>();
  const [darkmode, setDarkmode] = useState<Boolean>(false);
  const navigate = useNavigate();
  const applyDark = () => {
    if (darkmode) {
      localStorage.setItem('darkmode', 'on');
    } else {
      localStorage.removeItem('darkmode');
    }
  };
  const editBtn = () => {
    localStorage.setItem('postId', `${postId}`);
    navigate('/post/write');
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser();
    }
    if (localStorage.getItem('darkmode') === 'on') {
      setDarkmode(true);
    }
  }, []);
  useEffect(() => {
    console.log(user.id, id, '일치여부');
  }, [user]);
  useEffect(() => {
    applyDark();
  }, [darkmode]);
  return (
    <PostSetBox>
      {Number(id) === user?.id && (
        <div className="btn" onClick={editBtn}>
          수정
        </div>
      )}
      {Number(id) === user?.id && <div className="btn">삭제</div>}
      <div className="darkmodebtn" onClick={() => setDarkmode(!darkmode)}>
        <p className="text">다크모드</p>
        <ToggleBtn active={Boolean(darkmode)} />
      </div>
    </PostSetBox>
  );
}
