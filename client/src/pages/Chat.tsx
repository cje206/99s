import { useState } from 'react';
import {
  DateChatMsg,
  InputChat,
  MyChatMsg,
  OpChatMsg,
} from '../components/ChatMsg';
import Chatlist from '../components/Chatlist';
import { ChatDetailHeader, ChattingHeader } from '../components/Headers';
import { ChatDataProps } from '../types';

export default function Chat() {
  const [chatData, setChatData] = useState<ChatDataProps>({
    open: false,
    data: [],
  });
  return (
    <div className="wrap">
      {chatData.open || <ChattingHeader />}
      {chatData.open && <ChatDetailHeader />}
      <div className="body" style={{ marginBottom: '100px' }}>
        {chatData.open || (
          <Chatlist
            nickname="닉네임"
            recentMsg="최근 메세지"
            sendTime="오전 10:10"
            roomId="1to2"
            data={setChatData}
          />
        )}
        {chatData.data?.map((value) => {
          return (
            <MyChatMsg
              key={value.id}
              text={value.chatMsg}
              sendTime={value.createdAt}
            />
          );
        })}
        {chatData.open && <InputChat userId={1} roomId={chatData.roomId} />}
      </div>
    </div>
  );
}
