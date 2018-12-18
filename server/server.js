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

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app.',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  // Listen for custom event from client
  socket.on('createMessage', message => {
    console.log('Create message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // sending to all clients except sender
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  });
});

server.listen(port, () => {
  console.log(`Starting on port ${port}`);
});
