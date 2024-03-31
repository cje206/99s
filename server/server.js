const express = require('express');
const db = require('./models');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const PORT = 8000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors());

const memberRouter = require('./routes/member');
app.use('/api/member', memberRouter);
const chatRouter = require('./routes/chat');
app.use('/api/chat', chatRouter);

// 채팅(소켓)
io.on('connection', (socket) => [
  // 채팅방 접속
  socket.on('enter', (res) => {
    const { roomId } = res;
    socket.join(roomId);
    socket.roomId = roomId;
  }),
  // 채팅 입력
  socket.on('msg', (res) => {
    const { chatMsg, userId } = res;
    io.to(socket.roomId).emit('newMsg', {
      chatMsg,
      userId,
      roomId: socket.roomId,
    });
  }),
]);

db.sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
