import { useEffect, useState } from 'react';
import { InputChat, MyChatMsg, OpChatMsg } from '../components/ChatMsg';
import Chatlist from '../components/Chatlist';
import { ChatDetailHeader, ChattingHeader } from '../components/Headers';
import { ChatDataProps } from '../types';
import useAuth from '../hooks/useAuth';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

export default function Chat() {
  const socket = socketIOClient('localhost:8000');
  const [user, setUser] = useAuth();
  const [roomList, setRoomList] = useState<any[]>([]);
  const [chatData, setChatData] = useState<ChatDataProps>({
    open: false,
    data: [],
    roomId: '',
    nickname: '',
  });

  const findRoom = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/chat/find',
      params: { userId: user.id },
    });
    console.log(res);
    setRoomList(res.data.result);
  };

  useEffect(() => {
    setUser();
  }, []);
  useEffect(() => {
    findRoom();
    if (localStorage.getItem('chat')) {
      const opId = Number(localStorage.getItem('chat'));
      const roomId: string = `${user.id > opId ? opId : user.id}to${
        user.id > opId ? user.id : opId
      }`;
      const enterRoom = async (roomId: string) => {
        socket.emit('enter', { roomId });
        const res = await axios({
          method: 'GET',
          url: 'http://localhost:8000/api/chat/check',
          params: { roomId },
        });
        const searchName = await axios({
          method: 'GET',
          url: 'http://localhost:8000/api/chat/nickname',
          params: { memberId: opId },
        });
        console.log(searchName.data.result);
        setChatData({
          open: true,
          data: res.data.result,
          roomId,
          nickname: searchName.data.result.nickname,
        });
      };
      enterRoom(roomId);
    }
  }, [user]);
  useEffect(() => {
    if (chatData.open) {
      localStorage.removeItem('chat');
      console.log(chatData.data);
    }
  }, [chatData]);

  return (
    <div className="wrap">
      {chatData.open || <ChattingHeader />}
      {chatData.open && (
        <ChatDetailHeader>{chatData.nickname}</ChatDetailHeader>
      )}
      <div className="body" style={{ marginBottom: '100px' }}>
        {chatData.open ||
          roomList?.map((value, idx) => {
            console.log(idx);
            return (
              <Chatlist
                key={value.id}
                nickname={value.nickname}
                recentMsg={value.recentMsg}
                sendTime={value.updatedAt}
                roomId={value.roomId}
                data={setChatData}
              />
            );
          })}

        {chatData.data?.map((value) => {
          if (value.userId == user.id) {
            return (
              <MyChatMsg
                key={value.id}
                text={value.chatMsg}
                sendTime={value.createdAt}
              />
            );
          } else {
            return (
              <OpChatMsg
                key={value.id}
                text={value.chatMsg}
                sendTime={value.createdAt}
              />
            );
          }
        })}
        {chatData.open && (
          <InputChat userId={user.id} chatlist={[chatData, setChatData]} />
        )}
      </div>
    </div>
  );
}
