import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeStyle } from '../types';
import { useEffect, useState } from 'react';
import { BlogSidemenu, DefaultSidemenu, SetSidemenu } from './Sidemenus';
import axios from 'axios';
import { getColor } from './Functions';

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
  background: #fff;
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
const Profile = styled.div`
  margin: 15px 0;
  width: 40px;
  height: 40px;
  background: #ddd;
  border-radius: 50%;
  margin-right: 6px;
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
      <BoxStyle>
        <Icon $url="lmenu" onClick={() => setSidemenu(true)}></Icon>
        <LogoImg
          src="/images/logo2.png"
          alt="Blo9"
          onClick={() => navigate('/')}
        />
        <Icon $url="search" onClick={() => navigate('/search')}></Icon>
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
      <BoxStyle>
        <Icon $url="lmenu" onClick={() => setSidemenu(true)}></Icon>
        <Text>{children}</Text>
        <Icon $url="search" onClick={() => navigate('/search')}></Icon>
      </BoxStyle>
      {sidemenu && <DefaultSidemenu func={closeFunc} />}
    </>
  );
}

export function SearchHeader() {
  const navigate = useNavigate();
  return (
    <BoxStyle>
      <LogoImg
        src="/images/logo2.png"
        alt="Blo9"
        onClick={() => navigate('/')}
      />
      <SearchBox>
        <InputBox />
        <BtnBox>
          <Icon $url="search-white"></Icon>
        </BtnBox>
      </SearchBox>
    </BoxStyle>
  );
}

export function BlogHeader({
  children,
  theme,
}: {
  children: string;
  theme: ThemeStyle;
}) {
  const [sidemenu, setSidemenu] = useState<boolean>(false);
  const closeFunc = () => {
    setSidemenu(false);
  };
  return (
    <>
      <BoxStyle
        style={{
          background: theme.color,
          color: theme.background,
        }}
      >
        <Text>{children}</Text>
        <BtnsWrap>
          <Icon $url="search"></Icon>
          <Icon $url="rmenu" onClick={() => setSidemenu(true)}></Icon>
        </BtnsWrap>
      </BoxStyle>
      {sidemenu && <BlogSidemenu func={closeFunc} />}
    </>
  );
}

export function BlogHeaderid({ id }: { id: number }) {
  const [theme, setTheme] = useState<ThemeStyle>({
    color: '#fff',
    background: '#333',
  });
  const [title, setTitle] = useState<string>('');
  const getBlogInfo = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/blog/find',
      params: { memberId: id },
    });
    console.log(res.data.result);
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
        <Text>{title}</Text>
        <BtnsWrap>
          <Icon $url="search"></Icon>
          <Icon $url="rmenu" onClick={() => setSidemenu(true)}></Icon>
        </BtnsWrap>
      </BoxStyle>
      {sidemenu && <BlogSidemenu func={closeFunc} />}
    </>
  );
}

export function SettingHeader({ children }: any) {
  const [sidemenu, setSidemenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const closeFunc = () => {
    setSidemenu(false);
  };
  return (
    <BoxStyle>
      <LogoImg
        src="/images/logo2.png"
        alt="Blo9"
        onClick={() => navigate('/')}
      />
      <TextCenter>{children}</TextCenter>
      <Icon $url="rmenu" onClick={() => setSidemenu(true)}></Icon>
      {sidemenu && <SetSidemenu func={closeFunc} />}
    </BoxStyle>
  );
}

export function ChattingHeader() {
  const navigate = useNavigate();
  return (
    <BoxStyle>
      <LogoImg
        src="/images/logo2.png"
        alt="Blo9"
        onClick={() => navigate('/')}
      />
      <TextCenter>채팅</TextCenter>
      <Icon $url="search"></Icon>
    </BoxStyle>
  );
}

export function ChatDetailHeader({ children }: { children: string }) {
  return (
    <BoxStyle>
      <BtnsWrap>
        <Profile />
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
      <LogoImg
        src="/images/logo2.png"
        alt="Blo9"
        onClick={() => navigate('/')}
      />
    </BoxStyle>
  );
}
