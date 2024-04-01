import { useEffect, useState } from 'react';
import {
  DateChatMsg,
  InputChat,
  MyChatMsg,
  OpChatMsg,
} from '../components/ChatMsg';
import Chatlist from '../components/Chatlist';
import { ChatDetailHeader, ChattingHeader } from '../components/Headers';
import { ChatDataProps } from '../types';
import useAuth from '../hooks/useAuth';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

let opUser: string = '';

export default function Chat() {
  const socket = socketIOClient('localhost:8000');
  const [user, setUser] = useAuth();
  const [opName, setOpName] = useState<string>('');
  const [roomList, setRoomList] = useState<any[]>([]);
  useEffect(() => {
    setUser();
  }, []);
  useEffect(() => {
    findRoom();
  }, [user]);
  const findRoom = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/chat/find',
      params: { userId: user.id },
    });
    setRoomList(res.data.result);
  };

  const [chatData, setChatData] = useState<ChatDataProps>({
    open: false,
    data: [],
    roomId: '',
  });
  // 상대방 닉네임 구하는 함수
  const searchName = async (idx: number) => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/member/searchId',
      params: { id: idx },
    });
    console.log('함수 안', res.data.result.username);
    return res.data.result.username;
  };
  const getName = (idx: number) => {
    searchName(idx).then((data) => {
      console.log('함수 밖', data);
      setOpName(data);
    });
    console.log(opName);
    return opName;
  };
  // const getName = (idx: number): string => {
  //   let opUser: string = '';
  //   let username: string = '';
  //   const search = async () => {
  //     const res = await axios({
  //       method: 'GET',
  //       url: 'http://localhost:8000/api/member/searchId',
  //       params: { id: idx },
  //     });
  //     opUser = res.data.result.username;
  //     console.log(res.data.result.username);
  //   };
  //   search();
  //   return opUser;
  // };

  const rst = (value: any) => {
    let recentTime = new Date(value.updatedAt);
    let nowTime = new Date();
    let displayTime: string = '';
    let hDiff = (nowTime.getTime() - recentTime.getTime()) / (60 * 60 * 1000);
    if (hDiff < 24) {
      recentTime.getHours() <= 12
        ? (displayTime = `오전 ${recentTime.getHours()}:${recentTime.getMinutes()}`)
        : (displayTime = `오후 ${
            recentTime.getHours() - 12
          }:${recentTime.getMinutes()}`);
    } else {
      displayTime = `${recentTime.getMonth() + 1}월 ${recentTime.getDate()}일`;
    }
    const [user1, user2] = value.roomId.split('to');
    let opId: number = 0;
    if (user1 != user.id) {
      opId = user1;
    } else {
      opId = user2;
    }
    opUser = getName(opId);
    return (
      <Chatlist
        key={value.id}
        nickname={opUser}
        recentMsg={value.recentMsg}
        sendTime={displayTime}
        roomId={value.roomId}
        data={setChatData}
      />
    );
  };

  return (
    <div className="wrap">
      {chatData.open || <ChattingHeader />}
      {chatData.open && <ChatDetailHeader />}
      <div className="body" style={{ marginBottom: '100px' }}>
        {chatData.open ||
          roomList?.map((value, idx) => {
            console.log(idx);
            return rst(value);
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
