import styled from 'styled-components';
import { ChatListProps } from '../types';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import ProfileImage from './ProfileImage';

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
  const socket = socketIOClient(`${process.env.REACT_APP_HOST}`);
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
