const mongoose = require('mongoose');
const uuid = require('uuid');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    login: { type: String, required: true, createIndexes: { unique: true } },
    password: { type: String, required: true },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.pre('save', async function save(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.pre('findOneAndUpdate', async function preUpdate(next) {
  const user = this;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    user._update.password = await bcrypt.hash(user._update.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
