import dbApi from '../api/db';

export function getConfig() {
  return dbApi.getConfig();
}

export function addItem(path, item) {
  return dbApi.addItem(path, item);
}
