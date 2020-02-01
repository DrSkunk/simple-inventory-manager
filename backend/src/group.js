import nanoid from 'nanoid';
import db from './db';

export function addGroup(data) {
  const { path, group } = data;
  if (path === undefined || !group || !group.title) {
    throw new Error('path, group and group title should be supplied');
  }

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
}
