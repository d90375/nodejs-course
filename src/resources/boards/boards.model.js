const mongoose = require('mongoose');
const uuid = require('uuid');

const columnSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number
  },
  { versionKey: false }
);

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: [columnSchema]
  },
  { versionKey: false }
);

columnSchema.statics.toResponse = column => {
  const { id, title, order } = column;
  return { id, title, order };
};

const Column = mongoose.model('Column', columnSchema);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  const columnsToResponse = columns.map(Column.toResponse);

  return { id: id, title, columns: columnsToResponse };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
