import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { UserProps } from '../types';
import useAuth from '../hooks/useAuth';
const TableStyle = styled.table`
  width: 100%;
  margin: 10px 0 30px;
`;
const ThStyle = styled.th`
  width: 33.3%;
  line-height: 50px;
  background: #f5f7f9;
  border-right: 1px solid #e3e5e7;
`;
const TdStyle = styled.td`
  width: 33.3%;
  line-height: 50px;
  text-align: center;
  border-right: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
`;
const LinkBox = styled.div`
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
    background: url('./images/ico-arrR.png') no-repeat center/contain;
  }
`;
const CheckBox = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  .flexBox {
    display: flex;
    align-items: flex-start;
    label {
      margin-left: 10px;
      span {
        font-size: 12px;
        color: #777;
      }
    }
  }
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  .btn {
    line-height: 30px;
    padding: 0 10px;
    margin-left: 10px;
    border-radius: 4px;
    &.active {
      border: 1px solid #fbc02d;
      color: #fbc02d;
    }
    &.disabled {
      background: #f5f7fa;
      color: #abbed1;
    }
  }
`;
const BoxStyle = styled.div`
  width: 100%;
  border: none;
  border-radius: 6px;
  background-color: #f6f7f9;
  box-sizing: border-box;
  padding: 10px;
  color: #89939e;
  font-size: 14px;
  margin-bottom: 20px;
`;

const AddButton = styled.button``;

const InputStyle = styled.input`
  width: 100%;
  border: none;
  background: none;
  line-height: 2;
  margin-top: 6px;
  label {
    display: block;
  }
`;
const EditBox = styled.div`
  display: flex;
  justify-content: center;
  .btn {
    display: block;
    padding: 0 40px;
    line-height: 50px;
    box-sizing: border-box;
    border-radius: 50px;
    &.btnCancle {
      border: 1px solid #fbc02d;
      margin-right: 10px;
    }
    &.btnEdit {
      background: #fbc02d;
      color: #fff;
    }
  }
`;
const TextBtn = styled.button`
  display: block;
  margin: 0 auto;
  color: #fbc02d;
  font-weight: 700;
`;

interface Props {
  user: UserProps;
}

export function SetHome() {
  return (
    <>
      <TableStyle className="settingTable">
        <thead>
          <tr>
            <ThStyle>분류</ThStyle>
            <ThStyle>24시간</ThStyle>
            <ThStyle style={{ border: 'none' }}>누적</ThStyle>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TdStyle>조회수</TdStyle>
            <TdStyle>0회</TdStyle>
            <TdStyle style={{ borderRight: 'none' }}>10회</TdStyle>
          </tr>
          <tr>
            <TdStyle>구독자 수</TdStyle>
            <TdStyle>0회</TdStyle>
            <TdStyle style={{ borderRight: 'none' }}>10회</TdStyle>
          </tr>
        </tbody>
      </TableStyle>
      <Link to="/setting/post">
        <LinkBox>
          <div className="title">글 관리</div>
          <div className="ico-arrR"></div>
        </LinkBox>
      </Link>
      <Link to="/setting/category">
        <LinkBox>
          <div className="title">카테고리 관리</div>
          <div className="ico-arrR"></div>
        </LinkBox>
      </Link>
      <Link to="/setting/info">
        <LinkBox>
          <div className="title">개인정보 수정</div>
          <div className="ico-arrR"></div>
        </LinkBox>
      </Link>
      <Link to="/setting/blog">
        <LinkBox>
          <div className="title">블로그 편집</div>
          <div className="ico-arrR"></div>
        </LinkBox>
      </Link>
    </>
  );
}
export function SetPost() {
  return (
    <>
      <CheckBox>
        <div className="flexBox" style={{ marginBottom: '10px' }}>
          <input type="checkbox" id="check1" />
          <label htmlFor="check01">
            글 제목
            <br />
            <span>카테고리 &#183; 2024-04-01 12:37</span>
          </label>
        </div>
        <BtnBox>
          <div className="btn active">수정</div>
          <div className="btn disabled">삭제</div>
        </BtnBox>
      </CheckBox>
    </>
  );
}
export function SetCategory() {
  const categoryStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  return (
    <>
      <CheckBox style={categoryStyle}>
        <div className="flexBox" style={{ alignItems: 'center' }}>
          <input type="checkbox" id="check1" />
          <label htmlFor="check01">
            카테고리명
            <span> 분류</span>
          </label>
        </div>
        <BtnBox>
          <div className="btn active">수정</div>
          <div className="btn disabled">삭제</div>
        </BtnBox>
      </CheckBox>
      <CheckBox style={categoryStyle}>
        <div className="flexBox" style={{ alignItems: 'center' }}>
          <input type="checkbox" id="check1" />
          <label htmlFor="check01">
            카테고리명
            <span> 분류</span>
          </label>
        </div>
        <BtnBox>
          <div className="btn active">수정</div>
          <div className="btn disabled">삭제</div>
        </BtnBox>
      </CheckBox>
    </>
  );
}

export function SetInfo() {
  const [user, setUser] = useAuth();
  useEffect(() => {
    setUser();
  }, []);
  const [email, setEmail] = useState<string>('');
  const [nowPw, setNowPw] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [confirmPw, setConfirmPw] = useState<string>('');
  return (
    <>
      <div
        className="disabledInfo"
        style={{ borderBottom: '1px solid #eee', margin: '20px 0' }}
      >
        <BoxStyle>
          <label>이름</label>
          <InputStyle type="text" value={user.username} readOnly />
        </BoxStyle>
        <BoxStyle>
          <label>생년월일</label>
          <InputStyle type="text" value={user.birth} readOnly />
        </BoxStyle>
      </div>
      <div className="activeInfo">
        <BoxStyle>
          <label>이메일</label>
          <InputStyle
            type="text"
            value={email || user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </BoxStyle>
        <p>* 비밀번호 변경 시에만 아래의 정보를 입력해주세요.</p>
        {/* <BoxStyle>
          <label>현재 비밀번호</label>
          <InputStyle
            type="password"
            onChange={(e) => setNowPw(e.target.value)}
          />
        </BoxStyle>
        <BoxStyle>
          <label>변경 비밀번호</label>
          <InputStyle type="password" onChange={(e) => setPw(e.target.value)} />
        </BoxStyle>
        <BoxStyle>
          <label>비밀번호 확인</label>
          <InputStyle
            type="password"
            onChange={(e) => setConfirmPw(e.target.value)}
          />
        </BoxStyle> */}
      </div>
      <EditBox>
        <button className="btn btnCancle">취소</button>
        <button className="btn btnEdit">수정</button>
      </EditBox>
      <TextBtn>회원탈퇴</TextBtn>
    </>
  );
}
export function SetBlog() {
  return <div></div>;
}
