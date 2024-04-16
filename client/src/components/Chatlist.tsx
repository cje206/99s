import styled from 'styled-components';
import { ChatListProps } from '../types';
import { io } from 'socket.io-client';
import axios from 'axios';
import ProfileImage from './ProfileImage';
import { useEffect, useRef } from 'react';

const BoxStyle = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  .title {
    font-size: 16px;
    margin-bottom: 6px;
  }
  .msg {
    font-size: 14px;
    color: #808080;
  }
`;

export default function Chatlist({
  id,
  nickname,
  recentMsg,
  sendTime,
  roomId,
  data,
}: ChatListProps) {
  const socketRef = useRef(io('/'));
  const socket = socketRef.current;
  // const socket = socketIOClient(`${process.env.REACT_APP_HOST}`);
  const goChat = async (roomId: string) => {
    console.log('goChat');
    socket.emit('enter', { roomId });
    const res = await axios({
      method: 'GET',
      url: `http://localhost:8000/api/chat/check`,
      params: { roomId },
    });
    data({
      open: true,
      data: res.data.result,
      opId: id,
      roomId,
      nickname,
    });
  };
  useEffect(() => {
    console.log('Chatlist useEffect');
  }, []);
  return (
    <BoxStyle onClick={() => goChat(roomId)}>
      <ProfileImage id={id} />
      <div style={{ marginLeft: '10px' }}>
        <div className="title">{nickname}</div>
        <div className="msg">
          {recentMsg} &#183; {sendTime}
        </div>
      </div>
    </BoxStyle>
  );
}
