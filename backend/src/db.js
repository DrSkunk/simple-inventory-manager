import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ groups: [], receipts: [] }).write();

function stepIntoGroups(item, id) {
  return item.get('groups').find({ id });
}

class Database {
  constructor(db) {
    this.db = db;
  }

  getState() {
    return this.db.getState();
  }

  getGroup(path) {
    // split on an empty array gives an array with one item, so this check is needed
    const splitPath = path === '' ? [] : path.split('.');

    let dbItem = this.db;
    for (let i = 0; i < splitPath.length; i++) {
      const groupId = splitPath[i];
      dbItem = stepIntoGroups(dbItem, groupId);
    }

    if (dbItem === undefined) {
      throw new Error('invalid path supplied');
    }
    return dbItem;
  }

  addItem(path, item) {
    this.getGroup(path)
      .get('items')
      .push(item)
      .write();

    const addedItem = this.getGroup(path)
      .get('items')
      .find({ id: item.id })
      .value();

    if (!addedItem) {
      throw new Error(
        "Item didn't persist to the database, maybe an invalid path?"
      );
    }
    console.log('added item', addedItem, 'at path', path);
  }

  addGroup(path, group) {
    this.getGroup(path)
      .get('groups')
      .push(group)
      .write();

    const addedGroup = this.getGroup(path)
      .get('groups')
      .find({ id: group.id })
      .value();
    if (!addedGroup) {
      throw new Error(
        "Group didn't persist to the database, maybe an invalid path?"
      );
    }
    console.log('added group', addedGroup, 'at path', path);
  }
}

export default new Database(db);
