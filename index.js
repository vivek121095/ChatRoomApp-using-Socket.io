const express  = require('express');
const socket = require('socket.io');
const app = express();
const server = app.listen(4000,function () {
  console.log("listening to port 4000");
});
//static files
app.use(express.static('public'));
//socket setup
const io = socket(server);

io.on('connection',function(socket){
  socket.on('chat',function(data) {
    socket.broadcast.emit('chat',data);
  });
  socket.on('typing',function(data) {
    socket.broadcast.emit('typing',data);
  });
  socket.on('offline',function(data) {
    socket.broadcast.emit('offline',data);
  });
  socket.on('online',function(data) {
    socket.broadcast.emit('online',data);
  });
});
