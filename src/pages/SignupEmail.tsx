import React, { useState } from 'react';
import InputText from '../components/InputText';

export default function SignupEmail() {
  const [username, setUsername] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <div>
      <InputText text="이름" data={username} setValue={setUsername} />
      <InputText
        text="생년월일"
        placeholder="YYYY-MM-DD"
        data={birth}
        setValue={setBirth}
      />
      <InputText text="이메일" data={email} setValue={setEmail} />
      <InputText text="비밀번호" data={password} setValue={setPassword} />
    </div>
  );
}
