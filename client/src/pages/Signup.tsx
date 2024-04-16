import React from 'react';
import SingupBtn from '../components/SingupBtn';
import '../styles/signup.scss';
import { Link } from 'react-router-dom';
import { SignHeader } from '../components/Headers';
import Footer from '../components/Footer';

export default function Signup() {
  return (
    <div className="wrap">
      <SignHeader />
      <div className="body">
        <h1 className="title">Blo9 회원가입</h1>
        <p className="subText">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
        <div className="singupBtns">
          <SingupBtn text="이메일로 회원가입" method="email" />
          <SingupBtn text="이메일로 회원가입" method="email" />
          <SingupBtn text="이메일로 회원가입" method="email" />
        </div>
        <Link to="/find" className="findAccount">
          계정찾기
        </Link>
      </div>
      <Footer />
    </div>
  );
}
