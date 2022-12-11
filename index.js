require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();
const path = require('path');

const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on('connection', (socket) => {
  socket.emit('id', socket.id);
  socket.on('joinRoom', (room) => {
    socket.join(room);
  });
  socket.on('sending', (string, room) => {
    if (!room) {
      socket.emit('receiving', 'Please join a room first');
    }
    socket.to(room).emit('receiving', string);
  });
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  // Gewone html kan gebruikt worden omdat we geen templating engine nodig hebben om data  te injecteren
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

httpServer.listen(process.env.PORT, () =>
  console.log('Server started on port 3000')
);
