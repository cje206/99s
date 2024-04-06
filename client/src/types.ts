import { SetStateAction } from 'react';
export interface Info {
  name: string;
  birth: string;
  email: string;
  password: string;
}

export interface InputRef {
  current: HTMLInputElement;
}
export interface ChatDataProps {
  open: boolean;
  data: any[];
  roomId: string;
  nickname: string;
}

export interface ChatListProps {
  nickname: string;
  recentMsg: string;
  sendTime: string;
  roomId: string;
  data: React.Dispatch<React.SetStateAction<ChatDataProps>>;
}

export interface ChatMsgProps {
  text: string;
  sendTime: string;
}

export interface SendMsgProps {
  userId: number;
  chatlist?: any;
}
export interface UserProps {
  id: number;
  username: string;
  birth: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface EditorProps {
  body: string;
  setBody: React.Dispatch<SetStateAction<string>>;

export interface ThemeStyle {
  color: string;
  background: string;
  fontWeight?: string;
}

export interface ColorObject {
  color: string;
  background: string;

}
