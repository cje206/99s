import styled from 'styled-components';
import { ChatListProps } from '../types';
import { io } from 'socket.io-client';
import axios from 'axios';
import ProfileImage from './ProfileImage';
import { useEffect, useRef } from 'react';

let defaultColor = '#333';
let defaultBg = '#fff';
if (localStorage.getItem('darkmode') === 'on') {
  defaultBg = '#333';
  defaultColor = '#fff';
}

const BoxStyle = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e7e2;
  cursor: pointer;
  box-sizing: border-box;
  .title {
    font-size: 16px;
    margin-bottom: 6px;
  }
  .msg {
    font-size: 14px;
    color: #808080;
  }
  @media (min-width: 1160px) {
    padding: 20px;
  }
`;

export default function Chatlist({
  id,
  nickname,
  recentMsg,
  sendTime,
  roomId,
  data,
  active,
}: ChatListProps) {
  const socketRef = useRef(io('/'));
  const socket = socketRef.current;
  // const socket = socketIOClient(`${process.env.REACT_APP_HOST}`);
  const goChat = async (roomId: string) => {
    socket.emit('enter', { roomId });
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/chat/check`,
      params: { roomId },
    });
    console.log(res.data.result);
    data({
      open: true,
      data: res.data.result,
      opId: id,
      roomId,
      nickname,
    });
  };
  useEffect(() => {}, [data]);
  return (
    <BoxStyle
      onClick={() => goChat(roomId)}
      style={
        active === 'true'
          ? { color: defaultBg, background: defaultColor }
          : { color: defaultColor, background: defaultBg }
      }
    >
      <ProfileImage id={id} imgwidth="50px" />
      <div style={{ marginLeft: '10px' }}>
        <div className="title">{nickname}</div>
        <div className="msg">
          {recentMsg} &#183; {sendTime}
        </div>
      </div>
    </BoxStyle>
  );
}
