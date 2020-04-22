const mongoose = require('mongoose');
const uuid = require('uuid');

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: {
      type: [
        { title: String, order: Number, by: mongoose.Schema.Types.ObjectId }
      ],
    },
    default: []
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
