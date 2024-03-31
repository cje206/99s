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
  roomId?: string;
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
  roomId: string | undefined;
}

export interface newChat {
  userId: number;
  roomId: string;
  chatMsg: string;
}
