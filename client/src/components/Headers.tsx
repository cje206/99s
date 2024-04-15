import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeStyle } from '../types';
import { useEffect, useState } from 'react';
import { BlogSidemenu, DefaultSidemenu, SetSidemenu } from './Sidemenus';
import axios from 'axios';
import { getColor } from './Functions';
import ProfileImage from './ProfileImage';
import { ReactComponent as IcoMenuLeft } from '../images/ico-menu-left.svg';
import { ReactComponent as IcoMenuRight } from '../images/ico-menu-right.svg';
import { ReactComponent as IcoSearch } from '../images/ico-search.svg';
import { ReactComponent as Blo9Logo } from '../images/blo9_logo.svg';

let defaultColor = '#333';
let defaultBg = '#fff';
if (localStorage.getItem('darkmode') === 'on') {
  defaultBg = '#333';
  defaultColor = '#fff';
}

const BoxStyle = styled.div`
  width: 100%;
  height: 70px;
  position: sticky;
  top: 0;
  left: 0;
  line-height: 70px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  border-bottom: 1px solid #f1f1f1;
  background: ${defaultBg};
  @media (min-width: 1160px) {
    width: 1200px;
    margin: 0 auto;
  }
`;
const LogoImg = styled.img`
  width: 80px;
  height: auto;
`;
const Icon = styled.p<{ $url: string }>`
  width: 24px;
  height: 24px;
  background: url(${({ $url }) => `/images/ico-${$url}.png`}) no-repeat
    center/contain;
`;
const SearchBox = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
`;
const InputBox = styled.input`
  position: absolute;
  top: 0;
  left: 20px;
  right: 0;
  line-height: 40px;
  padding: 0 40px 0 20px;
  margin: 0;
  box-sizing: border-box;
  border-radius: 30px;
  border: 1px solid #acb1c6;
`;
const BtnBox = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  padding: 5px;
  background: #fbc02d;
  border-radius: 30px;
  font-size: 12px;
`;
const Text = styled.div`
  font-size: 18px;
  font-weight: bold;
  /* margin-left: 20px; */
`;
const BtnsWrap = styled.div`
  display: flex;
  p {
    margin-left: 10px;
  }
  .imgBox {
    margin: 15px 6px 15px 0;
  }
`;
const TextCenter = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;

  font-size: 16px;
  font-weight: bold;
  line-height: 70px;
`;
const Title = styled.p`
  font-size: 16px;
`;

export function MainHeader() {
  const [sidemenu, setSidemenu] = useState<boolean>(false);
  const navigate = useNavigate();

  const closeFunc = () => {
    setSidemenu(false);
  };
  return (
    <>
      <BoxStyle className="headerBg">
        <IcoMenuLeft
          stroke={defaultColor}
          fill="none"
          onClick={() => setSidemenu(true)}
        />
        <Blo9Logo fill={defaultColor} onClick={() => navigate('/')} />
        <IcoSearch
          stroke={defaultColor}
          fill="none"
          onClick={() => navigate('/search')}
        />
      </BoxStyle>
      {sidemenu && <DefaultSidemenu func={closeFunc} />}
    </>
  );
}

export function SubHeader({ children }: { children: string }) {
  const [sidemenu, setSidemenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const closeFunc = () => {
    setSidemenu(false);
  };
  return (
    <>
      <BoxStyle className="headerBg">
        <IcoMenuLeft
          stroke={defaultColor}
          fill="none"
          onClick={() => setSidemenu(true)}
        />
        <Text>{children}</Text>
        <IcoSearch
          stroke={defaultColor}
          fill="none"
          onClick={() => navigate('/search')}
        />
      </BoxStyle>
      {sidemenu && <DefaultSidemenu func={closeFunc} />}
    </>
  );
}

export function SearchHeader() {
  const navigate = useNavigate();
  return (
    <BoxStyle>
      <Blo9Logo fill={defaultColor} onClick={() => navigate('/')} />
      <SearchBox>
        <InputBox />
        <BtnBox>
          <IcoSearch stroke="#fff" />
        </BtnBox>
      </SearchBox>
    </BoxStyle>
  );
}

export function BlogHeader({ id }: { id: number }) {
  const navigator = useNavigate();
  const [theme, setTheme] = useState<ThemeStyle>({
    color: '#fff',
    background: '#333',
  });
  const [title, setTitle] = useState<string>('');
  const getBlogInfo = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/blog/find`,
      params: { memberId: id },
    });
    if (res.data.result) {
      setTitle(res.data.result.blogTitle);
    }
    getColor(
      setTheme,
      res.data.result.theme,
      res.data.result.fontColor,
      res.data.result.bgColor
    );
  };
  const [sidemenu, setSidemenu] = useState<boolean>(false);
  const closeFunc = () => {
    setSidemenu(false);
  };
  useEffect(() => {
    getBlogInfo();
  }, []);
  return (
    <>
      <BoxStyle
        style={{
          background: theme.color,
          color: theme.background,
        }}
      >
        {' '}
        <LogoImg
          src="/images/logo2.png"
          alt="Blo9"
          onClick={() => navigator('/')}
        />
        <Text
          onClick={() => navigator(`/blog/${id}`)}
          style={{ cursor: 'pointer' }}
        >
          {title}
        </Text>
        <BtnsWrap>
          <IcoSearch stroke={theme.background} />
          <IcoMenuRight
            stroke={theme.background}
            onClick={() => setSidemenu(true)}
          />
        </BtnsWrap>
      </BoxStyle>
      {sidemenu && <BlogSidemenu func={closeFunc} />}
    </>
  );
}

export function SettingHeader({ children }: any) {
  const [sidemenu, setSidemenu] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1160);
  const navigate = useNavigate();

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 1160);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeFunc = () => {
    setSidemenu(false);
  };

  return (
    <BoxStyle>
      <Blo9Logo fill={defaultColor} onClick={() => navigate('/')} />
      <TextCenter>{children}</TextCenter>
      {!isLargeScreen && (
        <IcoMenuRight stroke={defaultColor} onClick={() => setSidemenu(true)} />
      )}
      {sidemenu && <SetSidemenu func={closeFunc} />}
    </BoxStyle>
  );
}

export function ChattingHeader() {
  const navigate = useNavigate();
  return (
    <BoxStyle>
      <Blo9Logo fill={defaultColor} onClick={() => navigate('/')} />
      <TextCenter>채팅</TextCenter>
      <Icon $url="search"></Icon>
    </BoxStyle>
  );
}

export function ChatDetailHeader({
  id,
  children,
}: {
  id: number;
  children: string;
}) {
  return (
    <BoxStyle>
      <BtnsWrap>
        <ProfileImage id={id} imgwidth="40px" />
        <Title>{children}</Title>
      </BtnsWrap>
      <Icon $url="search"></Icon>
    </BoxStyle>
  );
}

export function SignHeader() {
  const navigate = useNavigate();
  return (
    <BoxStyle>
      <Blo9Logo fill={defaultColor} onClick={() => navigate('/')} />
    </BoxStyle>
  );
}
