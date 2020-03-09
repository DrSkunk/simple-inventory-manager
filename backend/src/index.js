import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import socketIo from 'socket.io';

import Search from './Search';
import { addItem, updateItem } from './item';
import { addGroup, updateGroup } from './group';
import db from './db';
import swaggerGenerator from './swaggerGenerator';
import config from './config.json';

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);
swaggerGenerator(app);

app.use(cors());
app.use(bodyParser.json());

if (config.hostWebClient) {
  app.use('/', express.static(config.webClientPath));
}

const search = new Search(db.getSearchableState());

/**
 * This function comment is parsed by doctrine
 * @route GET /
 * @group foo - Operations about user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
// app.get('/', (req, res, next) => {
//   res.send('backend is up and running');
//   next();
// });

/**
 * This function comment is parsed by doctrine
 * @route POST /addItem
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
app.post('/addItem', (req, res, next) => {
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
  socket.on('search', input => {
    socket.emit('searchResult', search.search(input));
  });
});

function sendUpdatedConfigToAllClients() {
  console.log('sendUpdatedConfigToAllClients');
  io.emit('config', db.getState());
}

httpServer.listen(config.port, function() {
  console.log('Server listening on port', config.port);
});
