import fs from 'fs';
import config from './config';
import mkdirp from 'mkdirp';

export function writeFilesAndGetFilenames(saveDir, list) {
  return list.map(file => {
    console.log('writing', file.filename, 'to', saveDir);
    fs.writeFileSync(saveDir + '/' + file.filename, file.blob);
    return file.filename;
  });
}
export function getStorageDirectory(path) {
  return config.storageDirectory.storageDirectory + path.replace('.', '/');
}

export function createDirectory(saveDir) {
  mkdirp.sync(saveDir);
}
