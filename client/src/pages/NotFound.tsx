import React from 'react';
import { Link } from 'react-router-dom';
import { SignHeader } from '../components/Headers';
import Footer from '../components/Footer';

const NotFound: React.FC = () => {
  return (
    <div className="wrap">
      <SignHeader />
      <div className="body" style={{ margin: '0 auto', padding: '20px' }}>
        <h1 className="title">페이지를 찾을 수 없습니다</h1>
        <Link to="/">Blo9 홈으로 이동</Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
