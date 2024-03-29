import React, { useState } from 'react';
import InputText from '../components/InputText';
import BtnLarge from '../components/BtnLarge';
import axios from 'axios';

export default function SignupEmail() {
  const [username, setUsername] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [confirmPw, setConfirmPw] = useState<string>('');

  const signupFunc = async () => {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/member/signup',
      data: {
        username,
        birth,
        email,
        pw,
      },
    });
    if (res.data.success) {
      alert('회원가입 완료');
    }
  };
  return (
    <div className="wrap">
      <InputText text="이름" data={username} setValue={setUsername} />
      <InputText
        text="생년월일"
        placeholder="YYYY-MM-DD"
        data={birth}
        setValue={setBirth}
      />
      <InputText text="이메일" type="email" data={email} setValue={setEmail} />
      <InputText text="비밀번호" type="password" data={pw} setValue={setPw} />
      <InputText
        text="비밀번호 확인"
        type="password"
        data={confirmPw}
        setValue={setConfirmPw}
      />
      {pw !== confirmPw && '비밀번호가 일치하지 않습니다.'}
      <BtnLarge text="회원가입" func={signupFunc} />
    </div>
  );
}
