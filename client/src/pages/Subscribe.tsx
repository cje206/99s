import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { SubHeader } from '../components/Headers';
import axios from 'axios';
import { WriterList } from '../components/Lists';

interface Obj {
  blogId: number;
}

export default function Subscribe() {
  const [user, setUser] = useAuth();
  const [subscribe, setSubscribe] = useState<Obj[]>();
  const getSub = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/blog/subList',
      params: { memberId: user.id },
    });
    console.log(res);
    setSubscribe(res.data.result);
  };
  useEffect(() => {
    if (user.id) {
      getSub();
    }
  }, [user]);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser();
    } else {
      alert('로그인 후 이용할 수 있습니다.');
      document.location.href = '/signup';
    }
  }, []);
  return (
    <div className="wrap">
      <SubHeader>구독 리스트</SubHeader>
      <div className="body" style={{ paddingTop: 0 }}>
        {Boolean(subscribe?.length) ? (
          subscribe?.map((val) => <WriterList id={val.blogId}></WriterList>)
        ) : (
          <div className="text">구독 리스트가 없습니다.</div>
        )}
      </div>
    </div>
  );
}