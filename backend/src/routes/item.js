import express from 'express';
const router = express.Router();

import { getItem } from '../models/item';

router.get('/*', (req, res, next) => {
  res.json({ hoi: 'hey' });
  next();
});

router.post('/', (req, res, next) => {
  const { data } = req.body;

  // attributes is het item object
  // relationships is kasticket
  const { type, attributes, relationships } = data;

  if (type !== 'item') {
    // Show error 400, type must be item
  }

  const { path, item } = req.body;
  addItem({ path, item });
  res.send(db.getState());
  res.contentType = 'json';
  res.status = 200;
  next();
});

// /**
//  * This function comment is parsed by doctrine
//  * @route POST /updateItem
//  * @group foo - Operations about user
//  * @param {string} email.query.required - username or email - eg: user@domain
//  * @param {string} password.query.required - user's password.
//  * @returns {object} 200 - An array of user info
//  * @returns {Error}  default - Unexpected error
//  */
// app.post('/updateItem', (req, res, next) => {
//   const { path, item } = req.body;
//   updateItem({ path, item });
//   res.send(db.getState());
//   res.contentType = 'json';
//   res.status = 200;
//   sendUpdatedConfigToAllClients();

//   next();
// });

/**
 * Update an item
 * @route PATCH /item/{group}
 * @group item - All item manipulations
 * @param {string} group.path.required - test
 * @ {string} email.query.required - username or email - eg: user@domain
 * @ {string} password.qsd.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.patch('/*', (req, res, next) => {
  const groupString = req.params[0];
  if (!groupString) {
    // invalid query
    throw new Error('invalid groupstring');
  }
  const ids = groupString.split('/');
  const itemId = ids.pop();

  if (ids.length === 0) {
    throw new Error('invalid length');
    // invalid query
  }
  const path = ids.join('.');
  const updatedItem = getItem(path, itemId);
  if (!updatedItem) {
    console.log('updatedItem', updatedItem);
    throw new Error("didn't update item");
  }
  // sendUpdatedConfigToAllClients();
  res.json(updatedItem);
  next();
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

// app.post('/updateGroup', (req, res, next) => {
//   const { path, group } = req.body;
//   updateGroup({ path, group });
//   res.send(db.getState());
//   res.contentType = 'json';
//   res.status = 200;
//   sendUpdatedConfigToAllClients();

//   next();
// });
export default router;
