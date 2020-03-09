import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';

import SocketServer from './lib/SocketServer';
import swaggerGenerator from './lib/swaggerGenerator';
import routes from './routes';
import config from './lib/config';

const app = express();
const httpServer = http.createServer(app);
const socketServer = new SocketServer(httpServer);
swaggerGenerator(app);

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use((req, res, next) => {
  if (req.method === 'PATCH' || req.method === 'POST') {
    socketServer.sendUpdatedConfigToAllClients();
  }
  next();
});
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  console.error(error);
  res.status(error.status).json({ errors: [error] });
});

// Host the built webapp on root if configured
if (config.hostWebClient) {
  app.use('/', express.static(config.webClientPath));
}

httpServer.listen(config.port, function() {
  console.log('Server listening on port', config.port);
});
