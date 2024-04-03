import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { UserProps } from '../types';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { ErrorMsgGrey, ErrorMsgRed } from './ErrorMsg';
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
  input {
    width: 100%;
    line-height: 2;
    margin-top: 6px;
  }
  label {
    display: block;
  }
  textarea {
    width: 100%;
    margin-top: 6px;
    line-height: 1.5;
    background: transparent;
    border: none;
  }
`;

const AddButton = styled.button``;

const EditBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
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
  line-height: 50px;
`;
const BlogBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .profileImg {
    width: 60px;
    height: 60px;
    background: #ddd;
    border-radius: 50%;
  }
  .editImg {
    padding: 0 15px;
    line-height: 30px;
    color: #fbc02d;
    border: 1px solid #fbc02d;
    height: fit-content;
    border-radius: 30px;
    margin-left: 15px;
  }
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
  const navigate = useNavigate();
  const [user, setUser] = useAuth();
  useEffect(() => {
    setUser();
  }, []);
  const [email, setEmail] = useState<string>('');
  const [nowPw, setNowPw] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [confirmPw, setConfirmPw] = useState<string>('');
  const nowPwRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const editFunc = async () => {
    let data;
    if (confirmPw !== pw) {
      alert('비밀번호가 일치하지 않습니다.');
      pwRef.current?.focus();
      return;
    }
    if (nowPw) {
      data = {
        id: user.id,
        email,
        nowPw,
        pw,
      };
    } else {
      data = { id: user.id, email };
    }
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:8000/api/member/update',
      data,
    });
    if (res.data.success) {
      alert('개인 정보 수정이 완료되었습니다.');
      document.location.reload();
    } else {
      alert('현재 비밀번호가 일치하지 않습니다.');
      nowPwRef.current?.focus();
    }
  };
  return (
    <>
      <div
        className="disabledInfo"
        style={{ borderBottom: '1px solid #eee', margin: '0 0 20px' }}
      >
        <BoxStyle>
          <label>이름</label>
          <input type="text" value={user.username || ''} readOnly />
        </BoxStyle>
        <BoxStyle>
          <label>생년월일</label>
          <input type="text" value={user.birth || ''} readOnly />
        </BoxStyle>
      </div>
      <div className="activeInfo">
        <BoxStyle>
          <label>이메일</label>
          <input
            type="email"
            value={email || user.email || ''}
            onChange={(e) => setEmail(e.target.value)}
          />
        </BoxStyle>
        <ErrorMsgGrey>
          * 비밀번호 변경 시에만 아래의 정보를 입력해주세요.
        </ErrorMsgGrey>
        <BoxStyle>
          <label>현재 비밀번호</label>
          <input
            type="password"
            onChange={(e) => setNowPw(e.target.value)}
            ref={nowPwRef}
          />
        </BoxStyle>
        <BoxStyle>
          <label>변경 비밀번호</label>
          <input
            type="password"
            onChange={(e) => setPw(e.target.value)}
            ref={pwRef}
          />
        </BoxStyle>
        <BoxStyle>
          <label>비밀번호 확인</label>
          <input
            type="password"
            onChange={(e) => setConfirmPw(e.target.value)}
          />
        </BoxStyle>
        {confirmPw == pw || (
          <ErrorMsgRed>* 비밀번호가 일치하지 않습니다.</ErrorMsgRed>
        )}
      </div>
      <EditBox>
        <button className="btn btnCancle" onClick={() => navigate('/setting')}>
          취소
        </button>
        <button className="btn btnEdit" onClick={editFunc}>
          수정
        </button>
      </EditBox>
      <TextBtn>회원탈퇴</TextBtn>
    </>
  );
}
const ThemeBox = styled.div<{ bgcolor?: string; txtcolor?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  .text {
    display: flex;
    line-height: 20px;
    width: 75%;
    .colorIcon {
      width: 20px;
      height: 20px;
      background: ${(props) => props.bgcolor || '#fff'};
      border: 2px solid ${(props) => props.txtcolor || '#333'};
      box-sizing: border-box;
      border-radius: 50%;
    }
    .colorName {
      margin: 0 0 0 10px;
      &.custom {
        width: 85%;
        .customInput {
          margin-top: 10px;
          width: 100%;
          border: 1px solid #eee;
          border-radius: 6px;
          position: relative;
          label {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 10px;
          }
          input {
            display: block;
            width: 100%;
            line-height: 30px;
            text-align: right;
            padding: 0 10px 0 60px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
  .btn {
    border: 2px solid #d9dbdf;
    padding: 0;
    border-radius: 50px;
    display: flex;
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
        background: ${(props) => props.txtcolor || '#333'};
      }
    }
  }
`;
export function SetBlog() {
  const navigate = useNavigate();
  const [customBg, setCustomBg] = useState<string>('#fff');
  const [customText, setCustomText] = useState<string>('#333');
  const btnClick = (idx: number) => {
    const btns = document.querySelectorAll('.btn');
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.remove('active');
      btns[idx].classList.add('active');
    }
  };
  return (
    <>
      <BlogBox>
        <div className="profileImg"></div>
        <button className="editImg">프로필 사진 변경</button>
      </BlogBox>
      <BoxStyle>
        <label>닉네임</label>
        <input type="text" placeholder="닉네임을 입력해주세요" />
      </BoxStyle>
      <BoxStyle>
        <label>소개</label>
        <textarea
          rows={3}
          placeholder="블로그 소개 문구를 입력해주세요"
        ></textarea>
      </BoxStyle>
      <h3>블로그 색상 변경</h3>
      <ThemeBox bgcolor="#fff" txtcolor="#fbc02d">
        <div className="text">
          <p className="colorIcon"></p>
          <p className="colorName">색상 1</p>
        </div>
        <button className="btn" onClick={() => btnClick(0)}>
          <span className="btnText on">ON</span>
          <span className="btnText off">OFF</span>
        </button>
      </ThemeBox>
      <ThemeBox bgcolor="#fff" txtcolor="#fbc02d">
        <div className="text">
          <p className="colorIcon"></p>
          <p className="colorName">색상 2</p>
        </div>
        <button className="btn" onClick={() => btnClick(1)}>
          <span className="btnText on">ON</span>
          <span className="btnText off">OFF</span>
        </button>
      </ThemeBox>
      <ThemeBox bgcolor="#fff" txtcolor="#fbc02d">
        <div className="text">
          <p className="colorIcon"></p>
          <p className="colorName">색상 3</p>
        </div>
        <button className="btn" onClick={() => btnClick(2)}>
          <span className="btnText on">ON</span>
          <span className="btnText off">OFF</span>
        </button>
      </ThemeBox>
      <ThemeBox bgcolor="#fff" txtcolor="#fbc02d">
        <div className="text">
          <p className="colorIcon"></p>
          <p className="colorName">색상 4</p>
        </div>
        <button className="btn" onClick={() => btnClick(3)}>
          <span className="btnText on">ON</span>
          <span className="btnText off">OFF</span>
        </button>
      </ThemeBox>
      <ThemeBox bgcolor={customBg} txtcolor={customText}>
        <div className="text">
          <p className="colorIcon"></p>
          <div className="colorName custom">
            <p>색상 커스텀</p>
            <div className="customInput">
              <ErrorMsgGrey>* 색상은 #~~의 형태로 입력해주세요.</ErrorMsgGrey>
              <label>배경색</label>
              <input
                type="text"
                className="bgColor"
                placeholder="#ffffff"
                onChange={(e) => setCustomBg(e.target.value)}
              />
            </div>
            <div className="customInput">
              <label>글자색</label>
              <input
                type="text"
                className="textColor"
                placeholder="#333333"
                onChange={(e) => setCustomText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button className="btn" onClick={() => btnClick(4)}>
          <span className="btnText on">ON</span>
          <span className="btnText off">OFF</span>
        </button>
      </ThemeBox>
      <EditBox>
        <button className="btn btnCancle" onClick={() => navigate('/setting')}>
          취소
        </button>
        <button className="btn btnEdit">수정</button>
      </EditBox>
    </>
  );
}
