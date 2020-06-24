import test from 'ava';
import db from '../../src/lib/jsonDb';
import ParameterError from '../../src/models/parameterError';
import {
  addGroup,
  updateGroup,
  removeGroup,
  clearItemsFromGroup
} from '../../src/models/group';
import { addItem, updateItem, removeItem } from '../../src/models/item';

test('initial state', t => {
  t.plan(1);
  t.deepEqual(db.getState(), {
    groups: [],
    receipts: []
  });
});

test('add group', t => {
  // t.plan(19);
  // // No title in group object
  // let error = t.throws(
  //   () => {
  //     addGroup('', {});
  //   },
  //   { instanceOf: ParameterError }
  // );
  // t.is(error.errorObject.source.pointer, '/data/attributes/group.title');
  // t.deepEqual(db.getState(), {
  //   groups: [],
  //   receipts: []
  // });
  // // String instead of object as group parameter
  // error = t.throws(
  //   () => {
  //     addGroup('', '');
  //   },
  //   { instanceOf: ParameterError }
  // );
  // t.is(error.errorObject.source.pointer, '/data/attributes/group');
  // t.deepEqual(db.getState(), {
  //   groups: [],
  //   receipts: []
  // });
  // // Only description
  // error = t.throws(
  //   () => {
  //     addGroup('', { description: 'only description is not enough' });
  //   },
  //   { instanceOf: ParameterError }
  // );
  // t.deepEqual(error.errorObject, {
  //   detail: 'group title must be supplied',
  //   status: 422,
  //   title: 'Invalid Attribute',
  //   source: { pointer: '/data/attributes/group.title' }
  // });
  // t.deepEqual(db.getState(), {
  //   groups: [],
  //   receipts: []
  // });
  // // invalid path
  // error = t.throws(() => {
  //   addGroup('doesntexist', { title: 'iueoejdhezi' });
  // });
  // t.is(error.message, 'invalid path supplied');
  // t.deepEqual(db.getState(), {
  //   groups: [],
  //   receipts: []
  // });
  // // Add only title
  // const rootGroup = { title: 'only title is okay' };
  // const addedRootGroup = addGroup('', rootGroup);
  // t.is(db.getState().groups[0].title, rootGroup.title);
  // // Add subgroup
  // const subGroup = {
  //   title: 'subgroup',
  //   description: 'subgroup description'
  // };
  // const addedSubGroup = addGroup(addedRootGroup.id, subGroup);
  // t.is(db.getState().groups[0].groups[0].title, subGroup.title);
  // t.is(db.getState().groups[0].groups[0].description, subGroup.description);
  // // Add subgroup to subgroup
  // const subSubGroup1 = {
  //   title: 'subsubgroup',
  //   description: 'subsubgroup description'
  // };
  // addGroup(addedRootGroup.id + '.' + addedSubGroup.id, subSubGroup1);
  // t.is(db.getState().groups[0].groups[0].groups[0].title, subSubGroup1.title);
  // t.is(
  //   db.getState().groups[0].groups[0].groups[0].description,
  //   subSubGroup1.description
  // );
  // // Add second subgroup to subgroup
  // const subSubGroup2 = {
  //   title: 'subsubgroup2',
  //   description: 'subsubgroup2 description'
  // };
  // addGroup(addedRootGroup.id + '.' + addedSubGroup.id, subSubGroup2);
  // t.is(db.getState().groups[0].groups[0].groups[1].title, subSubGroup2.title);
  // t.is(
  //   db.getState().groups[0].groups[0].groups[1].description,
  //   subSubGroup2.description
  // );
});

test('update item', t => {
  // const initialState = db.getState();
  // // Invalid title in group object
  // let error = t.throws(
  //   () => {
  //     updateGroup(initialState.groups[0].id, { title: {} });
  //   },
  //   { instanceOf: ParameterError }
  // );
  // t.is(error.errorObject.source.pointer, '/data/attributes/group.title');
  // t.deepEqual(db.getState(), initialState);
  // // Invalid description in group object
  // error = t.throws(
  //   () => {
  //     updateGroup(initialState.groups[0].id, { description: {} });
  //   },
  //   { instanceOf: ParameterError }
  // );
  // t.is(error.errorObject.source.pointer, '/data/attributes/group.description');
  // t.deepEqual(db.getState(), initialState);
  // // Update title
  // updateGroup(initialState.groups[0].id, { title: 'newTitle' });
  // t.is(db.getState().groups[0].title, 'newTitle');
  // // Update description
  // updateGroup(initialState.groups[0].id, { description: 'new description' });
  // t.is(db.getState().groups[0].description, 'new description');
  // // Update title and description
  // updateGroup(
  //   initialState.groups[0].id + '.' + initialState.groups[0].groups[0].id,
  //   {
  //     title: 'newTitle2',
  //     description: 'newDescription2'
  //   }
  // );
  // t.is(db.getState().groups[0].groups[0].title, 'newTitle2');
  // t.is(db.getState().groups[0].groups[0].description, 'newDescription2');
});

test('remove item', t => {
  //   // Cannot remove group with subgroups
  //   const rootGroup1 = db.getState().groups[0];
  //   let error = t.throws(() => {
  //     removeGroup(rootGroup1.id);
  //   });
  //   // TODO deftige error
  //   t.is(error.message, 'Cannot remove group with subgroups.');
  //   t.is(rootGroup1.groups.length, 1);
  //   // Cannot remove group with items
  //   const rootGroup2 = addGroup('', { title: 'second root group' });
  //   addItem(rootGroup2.id, {
  //     title: 'testItem1',
  //     description: '',
  //     barcode: '',
  //     currency: '',
  //     price: 0,
  //     url: ''
  //   });
  //   t.is(rootGroup2.items.length, 1);
  //   error = t.throws(() => {
  //     removeGroup(rootGroup2.id);
  //   });
  //   // TODO deftige error
  //   t.is(error.message, 'Cannot remove group with items.');
  //   t.is(rootGroup2.items.length, 1);
  //   // Remove group with no subgroups and items
  //   const rootGroup3 = addGroup('', { title: 'third root group' });
  //   t.is(db.getState().groups[2].title, 'third root group');
  //   removeGroup(rootGroup3.id);
  //   t.is(db.getState().groups[2], undefined);
  //   t.is(db.getState().groups.length, 2);
});
