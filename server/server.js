const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 9999;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));
// Register an event listener
io.on('connection', socket => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app.'));
  // sending to all clients except sender
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', message => {
    console.log('Create message', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  });
});

server.listen(port, () => {
  console.log(`Starting on port ${port}`);
});
