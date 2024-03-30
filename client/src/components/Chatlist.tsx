import styled from 'styled-components';
import { ChatListProps } from '../types';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const BoxStyle = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Profile = styled.div`
  width: 60px;
  height: 60px;
  background: #ddd;
  border-radius: 50%;
  margin-right: 20px;
`;
const Title = styled.p`
  font-size: 16px;
  margin-bottom: 6px;
`;
const Msg = styled.p`
  font-size: 14px;
  color: #808080;
`;

export default function Chatlist({
  nickname,
  recentMsg,
  sendTime,
  roomId,
  data,
}: ChatListProps) {
  const socket = socketIOClient('localhost:8000');
  const goChat = async (roomId: string) => {
    socket.emit('enter', { roomId });
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/chat/check',
      params: { roomId },
    });
    console.log(res.data.result);
    data({
      open: true,
      data: res.data.result,
      roomId,
    });
  };
  socket.on('newMsg', (res) => {
    console.log(res);
    goChat(res.roomId);
  });
  return (
    <BoxStyle onClick={() => goChat(roomId)}>
      <Profile></Profile>
      <div>
        <Title>{nickname}</Title>
        <Msg>
          {recentMsg} &#183; {sendTime}
        </Msg>
      </div>
    </BoxStyle>
  );
}
