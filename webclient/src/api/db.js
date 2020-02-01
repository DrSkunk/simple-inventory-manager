import axios from 'axios';
import config from '../config';
import { type } from '../model/types';

export default class dbApi {
  static getConfig() {
    return axios.get(config.endpoint + 'getConfig').then(res => res.data);
  }

  static addItem(path, item) {
    if (type[item.type] === undefined) {
      throw new Error('Invalid type supplied');
    }
    return axios
      .post(config.endpoint + 'addItem', {
        path,
        item
      })
      .then(res => res.data);
  }
}
