import axios from 'axios';
import { useState } from 'react';

export default function useAuth() {
  const [userInfo, setUserInfo] = useState<any>([]);

  const confirmAuth = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/member/find',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setUserInfo(res.data.result);
  };

  return [userInfo, confirmAuth];
}
