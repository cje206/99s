import React, { useState } from 'react';
import InputText from '../components/InputText';
import BtnLarge from '../components/BtnLarge';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="wrap">
      <InputText text="이메일" data={email} type="email" setValue={setEmail} />
      <InputText
        text="비밀번호"
        data={password}
        type="password"
        setValue={setPassword}
      />
      <BtnLarge text="로그인" />
    </div>
  );
}
