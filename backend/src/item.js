import nanoid from 'nanoid';
import {
  writeFilesAndGetFilenames,
  getStorageDirectory,
  createDirectory
} from './storage';
import db from './db';

export function updateItem({ path, item }) {}

export function addItem(data) {
  const { path, item } = data;
  if (!path || !item || !item.title) {
    throw new Error('path, item and item title should be supplied');
  }

  // Copy only the selected items to a new object and add a new id
  const copiedItem = (({
    title,
    description,
    barcode,
    price,
    currency,
    url
  }) => ({
    id: nanoid(),
    title,
    description,
    barcode,
    price,
    currency,
    url,
    files: [],
    pictures: []
  }))(item);

  // get and write files and pictures
  const saveDir = getStorageDirectory(path);

  if (item.pictures || item.files) {
    createDirectory(saveDir);
  }

  if (item.pictures && item.pictures.length !== 0) {
    console.log('found', item.pictures.length, 'picture(s)');
    copiedItem.pictures = writeFilesAndGetFilenames(saveDir, item.pictures);
  }
  if (item.files && item.files.length !== 0) {
    console.log('found', item.files.length, 'file(s)');
    copiedItem.files = writeFilesAndGetFilenames(saveDir, item.files);
  }

  db.addItem(path, copiedItem);
}
