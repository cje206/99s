import { newChat } from '../types';

const initalState: newChat = {
  userId: 0,
  roomId: '',
  chatMsg: '',
};

export default function newChatReducer(state = initalState, action: any) {
  const { type, userId, roomId, chatMsg } = action;
  if (type === 'sendMsg') {
    return { userId, roomId, chatMsg };
  }
}
