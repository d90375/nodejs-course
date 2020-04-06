const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'Title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    if (columns.length > 0) {
      this.columns = columns.map(column => {
        return { id: uuid(), ...column };
      });
    } else {
      this.columns = [];
    }
  }
}

module.exports = Board;
