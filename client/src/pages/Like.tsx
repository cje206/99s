import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { SubHeader } from '../components/Headers';
import { PostList } from '../components/Lists';

interface Obj {
  postId: number;
}

export default function Like() {
  const [user, setUser] = useAuth();
  const [like, setLike] = useState<Obj[]>();

  const getSub = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/post/likeList`,
      params: { memberId: user.id },
    });
    console.log(res);
    setLike(res.data.result);
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
      <SubHeader>좋아요 리스트</SubHeader>
      <div className="body" style={{ paddingTop: 0 }}>
        {Boolean(like?.length) ? (
          like?.map((val) => <PostList id={val.postId}></PostList>)
        ) : (
          <div className="text">구독 리스트가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
