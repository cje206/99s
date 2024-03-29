import React from 'react';
import SingupBtn from '../components/SingupBtn';
import '../styles/signup.scss';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className="wrap">
      <h1>Blo9 회원가입</h1>
      <p>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
      <div className="btns">
        <SingupBtn text="이메일로 회원가입" method="email" />
        <SingupBtn text="이메일로 회원가입" method="email" />
        <SingupBtn text="이메일로 회원가입" method="email" />
      </div>
      <Link to="/find" className="find">
        계정찾기
      </Link>
    </div>
  );
}
