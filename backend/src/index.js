import express from 'express';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
import http from 'http';
import socketIo from 'socket.io';

import { addItem, updateItem } from './item';
import { addGroup, updateGroup } from './group';
import db from './db';

const upload = multer({ dest: 'temp/' });

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send('backend is up and running');
  next();
});

app.post('/addItem', upload.single('image'), (req, res, next) => {
  const { path, item } = req.body;
  addItem({ path, item });
  res.send(db.getState());
  res.contentType = 'json';
  res.status = 200;
  sendUpdatedConfigToAllClients();

  next();
});

app.post('/updateItem', (req, res, next) => {
  const { path, item } = req.body;
  updateItem({ path, item });
  res.send(db.getState());
  res.contentType = 'json';
  res.status = 200;
  sendUpdatedConfigToAllClients();

  next();
});

app.post('/addGroup', (req, res, next) => {
  const { path, group } = req.body;
  addGroup({ path, group });
  res.send(db.getState());
  res.contentType = 'json';
  res.status = 200;
  sendUpdatedConfigToAllClients();

  next();
});

app.post('/updateGroup', (req, res, next) => {
  const { path, group } = req.body;
  updateGroup({ path, group });
  res.send(db.getState());
  res.contentType = 'json';
  res.status = 200;
  sendUpdatedConfigToAllClients();

  next();
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.emit('config', db.getState());
  socket.on('addItem', data => {
    addItem(data);
    sendUpdatedConfigToAllClients();
  });
  socket.on('updateItem', data => {
    updateItem(data);
    sendUpdatedConfigToAllClients();
  });
  socket.on('addGroup', data => {
    addGroup(data);
    sendUpdatedConfigToAllClients();
  });
  socket.on('updateGroup', data => {
    updateGroup(data);
    sendUpdatedConfigToAllClients();
  });
});

function sendUpdatedConfigToAllClients() {
  console.log('sendUpdatedConfigToAllClients');
  io.emit('config', db.getState());
}

httpServer.listen(8080, function() {
  console.log('Server listening on port 8080');
});
