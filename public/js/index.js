const socket = io();

socket.on('connect', function() {
  console.log('Connected to server.');
});

socket.on('disconnect', function() {
  console.log('Disconnected to server.');
});

// Listen for custom event from server
socket.on('newMessage', function(newMessage) {
  console.log('New message', newMessage);
});
