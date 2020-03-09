import nanoid from 'nanoid';
import db from '../lib/jsonDb';
import ParameterError from './parameterError';

function checkFields(path, group) {
  if (path === undefined) {
    throw new ParameterError('path must be supplied', 'path');
  } else if (!group || typeof group !== 'object') {
    throw new ParameterError('group must be a supplied object', 'group');
  } else if (!group.title) {
    throw new ParameterError('group title must be supplied', 'group.title');
  }
  if (!group.description) {
    group.description = '';
  }

  const toCheck = {
    path,
    'group.title': group.title,
    'group.description': group.description
  };
  Object.keys(toCheck).forEach(field => {
    const value = toCheck[field];
    if (typeof value !== 'string') {
      throw new ParameterError(`field ${field} must be a string`, field);
    }
  });
}

export function addGroup(path, group) {
  checkFields(path, group);

  const copiedGroup = (({ title, description }) => ({
    id: nanoid(),
    title,
    description,
    groups: [],
    items: []
  }))(group);

  try {
    return db.addGroup(path, copiedGroup);
  } catch (error) {
    throw new ParameterError('invalid path supplied', 'path');
  }
}

export function updateGroup(path, group) {
  checkFields(path, group);

  const copiedGroup = (({ id, title, description }) => ({
    id,
    title,
    description
  }))(group);

  db.updateGroup(path, copiedGroup);
}

export function removeGroup(path) {
  db.removeGroup(path);
}

export function clearItemsFromGroup(path) {
  db.clearItemsFromGroup(path);
}
