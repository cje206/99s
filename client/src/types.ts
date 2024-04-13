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
  opId: number;
  roomId: string;
  nickname: string;
}

export interface ChatListProps {
  id: number;
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
}
export interface ThemeStyle {
  color: string;
  background: string;
  fontWeight?: string;
}

export interface ColorObject {
  color: string;
  background: string;
}

export interface BlogObject {
  id: number;
  blogTitle: string;
  nickname: string;
  writerImg?: string | null;
  subscribeCount?: number;
  memberId?: number | null;
}
export interface PostObject {
  id: number;
  postTitle: string;
  content: string;
  hashtag: any[];
  likeCount?: number;
  categoryId?: number | null;
  createdAt?: string;
}

export interface OtherPostObj {
  id: number;
  postTitle: string;
}
