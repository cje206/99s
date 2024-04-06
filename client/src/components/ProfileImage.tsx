import styled from 'styled-components';
import { ReactComponent as DefaultPropfile } from '../images/default-profile.svg';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
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

export default function ProfileImage({ id }: { id: number }) {
  const [profile, setProfile] = useState<{ img: string | null }>({ img: '' });
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
      const { writerImg, bgColor, fontColor } = res.data.result;
      setProfile({
        img: writerImg,
      });
      getColor(res.data.result.theme, bgColor, fontColor, setTheme);
    }
  };
  useEffect(() => {
    getProfile();
    console.log(profile);
  }, []);

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
