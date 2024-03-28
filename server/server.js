const express = require('express');
const app = express();
const PORT = 8000;
const server = require('http').createServer(app);

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
