import styled from 'styled-components';
import { ChatMsgProps, SendMsgProps } from '../types';
import React, { useState } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

const BoxStyle = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
`;
const TimeStyle = styled.p`
  color: #a9a9a9;
  font-size: 12px;
  line-height: 20px;
`;
const ChatStyle = styled.p`
  padding: 10px;
  border-radius: 20px;
  max-width: 60vw;
  background: #f1f1f1;
`;
export function MyChatMsg({ text, sendTime }: ChatMsgProps) {
  return (
    <BoxStyle style={{ justifyContent: 'flex-end' }}>
      <TimeStyle>{sendTime}</TimeStyle>
      <ChatStyle
        style={{ background: '#43a046', color: '#fff', marginLeft: '10px' }}
      >
        {text}
      </ChatStyle>
    </BoxStyle>
  );
}
export function OpChatMsg({ text, sendTime }: ChatMsgProps) {
  return (
    <BoxStyle>
      <ChatStyle style={{ marginRight: '10px' }}>{text}</ChatStyle>
      <TimeStyle>{sendTime}</TimeStyle>
    </BoxStyle>
  );
}

export function DateChatMsg({ children }: any) {
  return (
    <div
      style={{
        textAlign: 'center',
        color: '#a9a9a9',
        fontSize: '12px',
        marginBottom: '10px',
      }}
    >
      {children}
    </div>
  );
}

const InputBox = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: #fff;
  padding: 15px;
  box-sizing: border-box;
`;
const TextInput = styled.input`
  width: 100%;
  margin: 0;
  padding: 0 70px 0 20px;
  box-sizing: border-box;
  border: none;
  background: #f5f5f5;
  line-height: 40px;
  border-radius: 20px;
  font-size: 16px;
`;
const SendBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  line-height: 30px;
  border-radius: 15px;
  background: #fbc02d;
  padding: 0 10px;
  color: #fff;
`;

export function InputChat({ userId, roomId }: SendMsgProps) {
  const socket = socketIOClient('localhost:8000');
  const [chatMsg, setChatMsg] = useState<string>('');
  const sendMsg = async () => {
    socket.emit('msg', {
      chatMsg,
      userId,
    });
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/chat/write',
      data: { userId, roomId, chatMsg },
    });
    setChatMsg('');
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code === 'Enter') {
      sendMsg();
    }
  };
  return (
    <InputBox>
      <TextInput
        type="text"
        placeholder="채팅 내용을 입력하세요."
        value={chatMsg}
        onChange={(e) => setChatMsg(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SendBtn type="button" onClick={sendMsg}>
        전송
      </SendBtn>
    </InputBox>
  );
}
