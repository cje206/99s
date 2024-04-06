import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { UserProps } from '../types';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { ErrorMsgGrey, ErrorMsgRed } from './ErrorMsg';
import { ToggleBtn } from './Btns';
import { ArrList } from './Lists';
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
  .add {
    width: 100%;
    input {
      line-height: 30px;
      background-color: #f5f7fa;
      padding: 0 15px;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 10px;
    }
    select {
      width: 100%;
      padding: 8px 10px;
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
    word-break: keep-all;
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
const RectBtn = styled.button`
  display: block;
  margin: 0 auto;
  color: #fff;
  background: #fbc02d;
  line-height: 30px;
  padding: 0 20px;
  border-radius: 6px;
  margin-top: 20px;
`;

interface Props {
  user: UserProps;
}

export function SetMenu() {
  return (
    <>
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
    </>
  );
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
      <SetMenu />
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
  const [user, setUser] = useAuth();
  const [list, setList] = useState<any[]>([]);
  const [isBlogExist, setIsbBlogExist] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [newGroup, setNewGroup] = useState<number>(1);
  const [create, setCreate] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);
  const categoryStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const unchangeCate = (id: number, name: string, group: string) => (
    <CheckBox key={id} style={categoryStyle}>
      <div className="flexBox" style={{ alignItems: 'center' }}>
        <input type="checkbox" id="check1" />
        <label htmlFor="check01">
          {name}
          <span> {group}</span>
        </label>
      </div>
      <BtnBox>
        <div
          className="btn active"
          onClick={() => {
            setEditId(id);
            setCreate(false);
            setNewName(name);
            setNewGroup(getGroupId(group));
          }}
        >
          수정
        </div>
        <div className="btn disabled" onClick={() => deleteFunc(id)}>
          삭제
        </div>
      </BtnBox>
    </CheckBox>
  );
  const changeCate = (id: number) => (
    <CheckBox style={categoryStyle}>
      <div className="add">
        <input
          type="text"
          placeholder="카테고리명"
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
        />
        <select
          onChange={(e) => setNewGroup(Number(e.target.value))}
          value={newGroup}
        >
          <option value="1">일상</option>
          <option value="2">스포츠</option>
          <option value="3">IT&#183;과학</option>
          <option value="4">시사&#183;경제</option>
          <option value="5">글로벌</option>
        </select>
      </div>
      <BtnBox>
        <div className="btn active" onClick={() => editFunc(id)}>
          저장
        </div>
        <div className="btn disabled" onClick={() => deleteFunc(id)}>
          삭제
        </div>
      </BtnBox>
    </CheckBox>
  );
  const newCate = () => {
    <CheckBox style={categoryStyle}>
      <div className="add">
        <input
          type="text"
          placeholder="카테고리명"
          onChange={(e) => setNewName(e.target.value)}
        />
        <select onChange={(e) => setNewGroup(Number(e.target.value))}>
          <option value="1">일상</option>
          <option value="2">스포츠</option>
          <option value="3">IT&#183;과학</option>
          <option value="4">시사&#183;경제</option>
          <option value="5">글로벌</option>
        </select>
      </div>
      <BtnBox>
        <div className="btn active" onClick={addFunc}>
          등록
        </div>
        <div className="btn disabled" onClick={() => setCreate(false)}>
          삭제
        </div>
      </BtnBox>
    </CheckBox>;
  };
  const getList = async () => {
    if (user.id) {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:8000/api/blog/getCategory',
        params: { memberId: user.id },
      });
      console.log(res);
      setIsbBlogExist(res.data.success);
      if (res.data.result) {
        setList(res.data.result);
      }
    }
  };
  const getGroupName = (idx: number): string => {
    switch (idx) {
      case 1:
        return '일상';
      case 2:
        return '스포츠';
      case 3:
        return 'IT·과학';
      case 4:
        return '시사·경제';
      case 5:
        return '글로벌';
      default:
        return '';
    }
  };
  const getGroupId = (idx: string): number => {
    switch (idx) {
      case '일상':
        return 1;
      case '스포츠':
        return 2;
      case 'IT·과학':
        return 3;
      case '시사·경제':
        return 4;
      case '글로벌':
        return 5;
      default:
        return 1;
    }
  };
  const addFunc = async () => {
    const data = {
      group: getGroupName(newGroup),
      categoryName: newName,
      memberId: user.id,
    };
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/blog/newCategory',
      data,
    });
    getList();
    setCreate(false);
  };
  const editFunc = async (id: number) => {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:8000/api/blog/updateCategory',
      data: {
        group: getGroupName(newGroup),
        categoryName: newName,
        id,
      },
    });
    document.location.reload();
  };
  const deleteFunc = async (id: number) => {
    if (!window.confirm('삭제하시겠습니까?')) {
      return;
    }
    const res = await axios({
      method: 'DELETE',
      url: 'http://localhost:8000/api/blog/delCategory',
      data: { id },
    });
    alert(res.data.msg);
    getList();
  };
  useEffect(() => {
    setUser();
  }, []);
  useEffect(() => {
    getList();
  }, [user]);
  return (
    <>
      {isBlogExist || (
        <Link to="/setting/blog">
          블로그가 없습니다.{' '}
          <span style={{ textDecoration: 'underline' }}> 블로그 생성하기</span>
        </Link>
      )}
      {isBlogExist && list.length === 0 && <p>카테고리를 생성해주세요!</p>}
      {isBlogExist &&
        list.map(({ id, categoryName, group }) => {
          if (editId == id) {
            return changeCate(id);
          } else {
            return unchangeCate(id, categoryName, group);
          }
        })}
      {create && newCate()}
      {isBlogExist && (
        <RectBtn
          onClick={() => {
            setEditId(0);
            setCreate(true);
            setNewName('');
          }}
        >
          카테고리 추가
        </RectBtn>
      )}
    </>
  );
}

export function SetInfo() {
  const navigate = useNavigate();
  const [user, setUser] = useAuth();
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
  const deleteFunc = async () => {
    // confirm('pw');
    if (!window.confirm('탈퇴하시겠습니까?')) {
      return;
    }
    const res = await axios({
      method: 'DELETE',
      url: 'http://localhost:8000/api/member/destroy',
      data: { id: user.id },
    });
    if (res.data.success) {
      alert('회원 탈퇴가 완료되었습니다.');
      document.location.href = '/';
    }
  };
  useEffect(() => {
    setUser();
  }, []);
  useEffect(() => {
    setEmail(user.email);
  }, [user]);
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
      <TextBtn onClick={deleteFunc}>회원탈퇴</TextBtn>
    </>
  );
}
export function SetBlog() {
  const navigate = useNavigate();
  const [user, setUser] = useAuth();
  const [nickname, setNickname] = useState<string>('');
  const [blogTitle, setBlogTitle] = useState<string>('');
  const [blogInfo, setBlogInfo] = useState<string>('');
  const [theme, setTheme] = useState<number>(1);
  const [customBg, setCustomBg] = useState<string>('');
  const [customText, setCustomText] = useState<string>('');
  const toggleBtn = (idx: number) => {
    const btns = document.querySelectorAll('.btn');
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.remove('active');
      btns[idx - 1].classList.add('active');
    }
  };
  const setInfo = async () => {
    if (user.id) {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:8000/api/blog/find',
        params: { memberId: user.id },
      });
      console.log(user);
      console.log(res);
      if (res.data.result) {
        setNickname(res.data.result.nickname);
        setBlogTitle(res.data.result.blogTitle);
        setBlogInfo(res.data.result.blogInfo || '');
        setTheme(res.data.result.theme);
        setCustomBg(res.data.result.bgColor || '#fff');
        setCustomText(res.data.result.fontColor || '#333');
      }
    }
  };
  const editFunc = async () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    if (!blogTitle.trim()) {
      alert('블로그 제목을 입력해주세요.');
      return;
    }
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:8000/api/blog/update',
      data: {
        memberId: user.id,
        nickname,
        blogTitle,
        blogInfo,
        theme,
        bgColor: customBg,
        fontColor: customText,
      },
    });
    if (res.data.success) {
      alert('블로그 수정이 완료되었습니다.');
    }
  };
  useEffect(() => {
    setUser();
    setInfo();
  }, []);
  useEffect(() => {
    setInfo();
  }, [user]);
  useEffect(() => {
    // toggleBtn(theme);
    console.log(theme);
  }, [theme]);

  return (
    <>
      <BlogBox>
        <div className="profileImg"></div>
        <button className="editImg">프로필 사진 변경</button>
        <button className="editImg">기본이미지</button>
      </BlogBox>
      <BoxStyle>
        <label>닉네임 *</label>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </BoxStyle>
      <BoxStyle>
        <label>블로그 제목 *</label>
        <input
          type="text"
          placeholder="블로그 제목을 입력해주세요"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
      </BoxStyle>
      <BoxStyle>
        <label>소개</label>
        <textarea
          rows={3}
          placeholder="블로그 소개 문구를 입력해주세요"
          value={blogInfo}
          onChange={(e) => setBlogInfo(e.target.value)}
        ></textarea>
      </BoxStyle>
      <h3>블로그 색상 변경</h3>
      <ThemeBox bgcolor="#f6f7f9" txtcolor="#333">
        <div className="text">
          <p className="colorIcon"></p>
          <p className="colorName">색상 1</p>
        </div>
        <div className="toggle" onClick={() => setTheme(1)}>
          <ToggleBtn active={theme === 1} btncolor="#333" />
        </div>
      </ThemeBox>
      <ThemeBox bgcolor="#f6f7f9" txtcolor="#fbc02d">
        <div className="text">
          <p className="colorIcon"></p>
          <p className="colorName">색상 2</p>
        </div>
        <div className="toggle" onClick={() => setTheme(2)}>
          <ToggleBtn active={theme === 2} btncolor="#fbc02d" />
        </div>
      </ThemeBox>
      <ThemeBox bgcolor="#f6f7f9" txtcolor="#11804b">
        <div className="text">
          <p className="colorIcon"></p>
          <p className="colorName">색상 3</p>
        </div>
        <div className="toggle" onClick={() => setTheme(3)}>
          <ToggleBtn active={theme === 3} btncolor="#11804b" />
        </div>
      </ThemeBox>
      <ThemeBox bgcolor="#f2f1ff" txtcolor="#352e91">
        <div className="text">
          <p className="colorIcon"></p>
          <p className="colorName">색상 4</p>
        </div>
        <div className="toggle" onClick={() => setTheme(4)}>
          <ToggleBtn active={theme === 4} btncolor="#352e91" />
        </div>
      </ThemeBox>
      <ThemeBox bgcolor={customBg} txtcolor={customText}>
        <div className="text">
          <p className="colorIcon"></p>
          <div className="colorName custom">
            <p>색상 커스텀</p>
            <ErrorMsgGrey>* 색상은 #~~의 형태로 입력해주세요.</ErrorMsgGrey>
            <div className="customInput">
              <label>배경색</label>
              <input
                type="text"
                className="bgColor"
                placeholder="#ffffff"
                value={customBg}
                onChange={(e) => setCustomBg(e.target.value)}
              />
            </div>
            <div className="customInput">
              <label>글자색</label>
              <input
                type="text"
                className="textColor"
                placeholder="#333333"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="toggle" onClick={() => setTheme(5)}>
          <ToggleBtn active={theme === 5} btncolor={customText} />
        </div>
      </ThemeBox>
      <EditBox>
        <button className="btn btnCancle" onClick={() => navigate('/setting')}>
          취소
        </button>
        <button className="btn btnEdit" onClick={editFunc}>
          수정
        </button>
      </EditBox>
    </>
  );
}
