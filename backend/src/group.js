import nanoid from 'nanoid';
import db from './db';

function checkFields(path, group) {
  if (path === undefined || !group || !group.title) {
    throw new Error('path, group and group title should be supplied');
  }
  [path, group.title, group.description].forEach(field => {
    console.log('field', field, typeof field);
    if (typeof field !== 'string') {
      throw new Error(
        'path, group title and group description must be strings'
      );
    }
  });
}

export function addGroup(data) {
  const { path, group } = data;
  checkFields(path, group);

  const copiedGroup = (({ title, description }) => ({
    id: nanoid(),
    title,
    description,
    groups: [],
    items: []
  }))(group);

  db.addGroup(path, copiedGroup);
}

export function updateGroup(data) {
  const { path, group } = data;
  checkFields(path, group);

  const copiedGroup = (({ id, title, description }) => ({
    id,
    title,
    description
  }))(group);

  db.updateGroup(path, copiedGroup);
}
