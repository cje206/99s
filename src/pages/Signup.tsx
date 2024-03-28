import React from 'react';
import SingupBtn from '../components/SingupBtn';

export default function Signup() {
  return (
    <div>
      <h1>Blo9 회원가입</h1>
      <p>
        이미 계정이 있으신가요? <span>로그인</span>
      </p>
      <div>
        <SingupBtn text="이메일로 회원가입" method="email" />
      </div>
    </div>
  );
}
