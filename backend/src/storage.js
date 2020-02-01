import fs from 'fs';
import { storageDirectory } from './config.json';
import mkdirp from 'mkdirp';

export function writeFilesAndGetFilenames(saveDir, list) {
  return list.map(file => {
    console.log('writing', file.filename, 'to', saveDir);
    fs.writeFileSync(saveDir + '/' + file.filename, file.blob);
    return file.filename;
  });
}
export function getStorageDirectory(path) {
  return storageDirectory + path.replace('.', '/');
}

export function createDirectory(saveDir) {
  mkdirp.sync(saveDir);
}
