const express = require('express');
const db = require('./models');
const http = require('http');

const app = express();
const PORT = 8000;
const server = http.createServer(app);

app.use(express.json());

const memberRouter = require('./routes/member');
app.use('/api/member', memberRouter);

db.sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
