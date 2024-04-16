import { useEffect, useRef, useState } from 'react';
import { InputChat, MyChatMsg, OpChatMsg } from '../components/ChatMsg';
import Chatlist from '../components/Chatlist';
import { ChatDetailHeader, ChattingHeader } from '../components/Headers';
import { ChatDataProps } from '../types';
import useAuth from '../hooks/useAuth';
import socketIOClient, { io } from 'socket.io-client';
import axios from 'axios';
import Footer from '../components/Footer';

export default function Chat() {
  const socketRef = useRef(io('/'));
  const socket = socketRef.current;
  // const socket = socketIOClient(':8000');
  const [user, setUser] = useAuth();
  const [roomList, setRoomList] = useState<any[]>([]);
  const [chatData, setChatData] = useState<ChatDataProps>({
    open: false,
    data: [],
    opId: 0,
    roomId: '',
    nickname: '',
  });

  const findRoom = async () => {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:8000/api/chat/find`,
      params: { userId: user.id },
    });
    console.log('findRoom');
    setRoomList(res.data.result);
  };

  useEffect(() => {
    console.log('메인 useEffect');
    if (localStorage.getItem('token')) {
      setUser();
    } else {
      document.location.href = '/login';
    }
  }, []);
  useEffect(() => {
    console.log('user변동 useEffect');
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
          url: `http://localhost:8000/api/chat/check`,
          params: { roomId },
        });
        const searchName = await axios({
          method: 'GET',
          url: `http://localhost:8000/api/chat/nickname`,
          params: { memberId: opId },
        });
        setChatData({
          open: true,
          opId,
          data: res.data.result,
          roomId,
          nickname: searchName.data.result.nickname,
        });
      };
      enterRoom(roomId);
    }
  }, [user]);
  useEffect(() => {
    console.log('chatdata 변동 useEffect');
    console.log(chatData);
    if (chatData.open) {
      localStorage.removeItem('chat');
    }
  }, [chatData]);

  return (
    <>
      <div className="wrap" style={{ paddingBottom: 0 }}>
        {chatData.open || <ChattingHeader />}
        {chatData.open && (
          <ChatDetailHeader id={chatData.opId || 0}>
            {chatData.nickname}
          </ChatDetailHeader>
        )}
        <div className="body" style={{ marginBottom: '100px' }}>
          {chatData.open ||
            roomList?.map((value, idx) => {
              return (
                <Chatlist
                  key={value.id}
                  id={value.id}
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
    </>
  );
}
