import { Server } from 'socket.io';
import http from 'http';

let io;

const initializeSocket = (server) => {
  io = new Server(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('new-product', (product) => {
      io.emit('update-products', product);
    });

    socket.on('delete-product', (productId) => {
      io.emit('remove-product', productId);
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

export { initializeSocket, getIO };
