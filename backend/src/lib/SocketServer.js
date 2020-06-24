import socketIo from 'socket.io';
import { addItem, updateItem, getItem } from '../models/item';
import { addGroup, updateGroup } from '../models/group';
import db from './jsonDb';
import Search from './Search';

export default class SocketServer {
  constructor(httpServer) {
    console.log('Initializing socket server');
    this.io = socketIo(httpServer);
    this.io.on('connection', function(socket) {
      console.log('a user connected');
      socket.emit('inventory', db.getState());
      socket.on('addItem', data => {
        addItem(data);
        sendUpdatedInventoryToAllClients();
      });
      socket.on('updateItem', data => {
        updateItem(data);
        sendUpdatedInventoryToAllClients();
      });
      socket.on('addGroup', data => {
        addGroup(data);
        sendUpdatedInventoryToAllClients();
      });
      socket.on('updateGroup', data => {
        updateGroup(data);
        sendUpdatedInventoryToAllClients();
      });
      socket.on('search', input => {
        socket.emit('searchResult', Search.search(input));
      });
    });
  }

  sendUpdatedInventoryToAllClients() {
    console.log('sendUpdatedInventoryToAllClients');
    this.io.emit('inventory', db.getState());
  }
}
