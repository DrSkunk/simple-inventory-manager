import express from 'express';

import { addGroup } from '../models/group';
import db from '../lib/jsonDb';

const router = express.Router();

router.patch('/*', (req, res) => {
  // const groupString = req.params[0];
  // if (!groupString) {
  //   // invalid query
  //   throw new Error('invalid groupstring');
  // }
  // const ids = groupString.split('/');
  // const itemId = ids.pop();
  // if (ids.length === 0) {
  //   throw new Error('invalid length');
  //   // invalid query
  // }
  // const path = ids.join('.');
  // const updatedItem = getItem(path, itemId);
  // if (!updatedItem) {
  //   console.log('updatedItem', updatedItem);
  //   throw new Error("didn't update item");
  // }
  // // sendUpdatedConfigToAllClients();
  // res.json(updatedItem);
});

router.post('/*', (req, res, next) => {
  const groupString = req.params[0];
  if (!groupString) {
    // invalid query
    // throw new Error("invalid groupstring");
    throw { hele: 'wereld' };
  }
  const ids = groupString.split('/');
  // const itemId = ids.pop();

  if (ids.length === 0) {
    throw new Error('invalid length');
    // invalid query
  }
  const path = ids.join('.');

  const { group } = req.body;
  try {
    addGroup({ path, group });
    res.send(db.getState());
    res.contentType = 'json';
    res.status = 200;
    next();
  } catch (error) {
    next(error);
  }
});

// app.post('/addGroup', (req, res, next) => {
//   const { path, group } = req.body;
//   addGroup({ path, group });
//   res.send(db.getState());
//   res.contentType = 'json';
//   res.status = 200;
//   sendUpdatedConfigToAllClients();

//   next();
// });
export default router;
