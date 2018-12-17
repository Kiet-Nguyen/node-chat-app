const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 9999;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));
// Register an event listener
io.on('connection', socket => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  });
});

server.listen(port, () => {
  console.log(`Starting on port ${port}`);
});
