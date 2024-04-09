import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.div`
  background-color: #e6e6e6;
  align-items: center;
  margin-top: 40px;
  padding: 30px;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
const Span = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  font-weight: bold;
  margin-bottom: 10px;
`;
const LinkInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;

  a {
    margin: 0 20px;
  }

  img {
    width: 40px;
    height: auto;
  }
  a:first-child {
    margin-left: 0;
  }
  a:last-child {
    margin-right: 0;
  }
`;

export default function Footer() {
  const [showContent, setShowContent] = useState(false);
  const toggleComments = () => {
    setShowContent(!showContent);
  };
  return (
    <>
      <FooterContainer>
        <Logo>
          <img
            style={{ width: '24px', height: 'auto' }}
            src="/images/logo1.png"
            alt="로고1"
          />
          <img
            style={{ width: '78px', height: '24px', padding: '7px' }}
            src="/images/logo2.png"
            alt="로고2"
          />
          <button onClick={toggleComments}>
            <img
              style={{ width: '15px', height: '10px' }}
              src={`${process.env.PUBLIC_URL}/images/${
                showContent ? 'ico-arrowDown' : 'ico-arrowUp'
              }.png`}
              alt=""
            />
          </button>
        </Logo>
        {!showContent && (
          <Span style={{ fontSize: '14px', color: '#C0C0C0' }}>
            Copyright ©99s All Rights Reserved.
          </Span>
        )}

        {showContent && (
          <>
            <Span style={{ fontSize: '16px', color: '#8F8F8F' }}>
              제작자 김민정, 최지은 | 주소 서울특별시 마포구 숭문4길 6 b1
            </Span>
            <Span style={{ fontSize: '14px', color: '#C0C0C0' }}>
              Copyright ©99s All Rights Reserved.
            </Span>
            <LinkInfo>
              <Link to="ppt 주소">
                <img src="/images/ico-ppt.png" alt="ppt링크" />
              </Link>
              <Link to="https://github.com/cje206/99s.git" target="_blank">
                <img src="/images/ico-github.png" alt="ppt링크" />
              </Link>
            </LinkInfo>
          </>
        )}
      </FooterContainer>
    </>
  );
}
