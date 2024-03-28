import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div>
      <h1>NotFound</h1>
      <Link to="/">홈으로 이동</Link>
    </div>
  );
};

export default NotFound;
