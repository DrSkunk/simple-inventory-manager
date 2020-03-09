import Fuse from 'fuse.js';

import db from './jsonDb';

const options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['title', 'description', 'barcode', 'files', 'pictures']
};

class Search {
  constructor(list) {
    this.setList(list);
  }

  setList(list) {
    this.fuse = new Fuse(list, options);
  }

  search(input) {
    return this.fuse.search(input);
  }
}

export default new Search(db.getSearchableState());
