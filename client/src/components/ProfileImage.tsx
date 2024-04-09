import styled from 'styled-components';
import { ReactComponent as DefaultPropfile } from '../images/default-profile.svg';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { storage } from '../config/Firebase';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { getColor } from './Functions';
import { ColorObject } from '../types';

const ProfileImg = styled.div<{ link?: string }>`
  background: url('${(props) => props.link}') no-repeat center/cover;
  &::before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;
const DefaultImg = styled.div<{ link?: string }>`
  width: 20%;
  height: fit-content;
  border-radius: 50%;
  overflow: hidden;
  background: #f6f7f9;
  svg {
    width: 100%;
    height: auto;
  }
`;

export default function ProfileImage({
  id,
  profileImgUrl,
}: {
  id: number;
  profileImgUrl?: string | null;
}) {
  const [profile, setProfile] = useState<{ img: string | null }>({ img: '' });
  const [file, setFile] = useState(null);
  const [theme, setTheme] = useState<ColorObject>({
    color: '#fbc02d',
    background: '#fff',
  });

  const getProfile = async () => {
    if (id !== 0) {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:8000/api/blog/find',
        params: { memberId: id },
      });
      if (res.data.result) {
        // res.data.result가 존재하는지 확인
        const { writerImg, bgColor, fontColor } = res.data.result;
        setProfile({
          img: writerImg,
        });
        getColor(res.data.result.theme, bgColor, fontColor, setTheme);
      } else {
        // res.data.result가 null이거나 undefined일 경우 처리
        console.log('No result found');
        // 필요한 경우 기본값 설정
        setProfile({ img: null });
        setTheme({
          color: '#fbc02d',
          background: '#fff',
        });
      }
    }
  };
  useEffect(() => {
    getProfile();
    console.log(profile);
  }, []);

  useEffect(() => {
    if (id !== 0) getProfile();
  }, [id]);

  useEffect(() => {
    if (profileImgUrl) {
      setProfile({ img: profileImgUrl });
    } else if (id !== 0) {
      getProfile();
    }
  }, [profileImgUrl, id]);

  return (
    <>
      {Boolean(id) ? (
        <DefaultImg className="imgBox">
          {profile.img ? (
            <ProfileImg link={profile.img} />
          ) : (
            <DefaultPropfile fill={theme.background} />
          )}
        </DefaultImg>
      ) : (
        <DefaultImg className="imgBox">
          <DefaultPropfile fill={theme.background} />
        </DefaultImg>
      )}
      {/*  */}
    </>
  );
}
